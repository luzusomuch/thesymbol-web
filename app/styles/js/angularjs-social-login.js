"use strict";

var socialLogin = angular.module('socialLogin', []);

socialLogin.provider("social", function(){
	var fbKey, fbApiV, googleKey, linkedInKey;
	return {
		setFbKey: function(obj){
			fbKey = obj.appId;
			fbApiV = obj.apiVersion;
			var d = document, fbJs, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
			fbJs = d.createElement('script'); 
			fbJs.id = id; 
			fbJs.async = true;
			fbJs.src = "//connect.facebook.net/en_US/sdk.js";

			fbJs.onload = function() {
				FB.init({ 
					appId: fbKey,
					status: true, 
					cookie: true, 
					xfbml: true,
					version: fbApiV
				});
	        };

			ref.parentNode.insertBefore(fbJs, ref);
		},
		setGoogleKey: function(value){
			googleKey = value;
			var d = document, gJs, ref = d.getElementsByTagName('script')[0];
			gJs = d.createElement('script');
			gJs.async = true;
			gJs.src = "//apis.google.com/js/platform.js"

			gJs.onload = function() {
				var params ={
					client_id: value,
					scope: 'email'
				}
				gapi.load('auth2', function() {
        			gapi.auth2.init(params);
      			});
		    };

		    ref.parentNode.insertBefore(gJs, ref);
		},
		setLinkedInKey: function(value){
			linkedInKey = value;
			var lIN, d = document, ref = d.getElementsByTagName('script')[0];
			lIN = d.createElement('script');
			lIN.async = false;
			lIN.src = "//platform.linkedin.com/in.js?async=false";
			lIN.text = ("api_key: " + linkedInKey).replace("\"", "");
	        ref.parentNode.insertBefore(lIN, ref);
	    },
		$get: function(){
			return{
				fbKey: fbKey,
				googleKey: googleKey,
				linkedInKey: linkedInKey,
				fbApiV: fbApiV
			}
		}
	}
});

socialLogin.factory("socialLoginService", function($window, $rootScope){
	return {
		logout: function(){
			var provider = $window.localStorage.getItem('_login_provider');
			switch(provider) {
				case "google":
					//its a hack need to find better solution.
					var gElement = document.getElementById("gSignout");
					if (typeof(gElement) != 'undefined' && gElement != null)
					{
					  gElement.remove();
					}
					var d = document, gSignout, ref = d.getElementsByTagName('script')[0];
					gSignout = d.createElement('script');
					gSignout.src = "https://accounts.google.com/Logout";
					gSignout.type = "text/javascript";
					gSignout.id = "gSignout";
					$window.localStorage.removeItem('_login_provider');
					$rootScope.$broadcast('event:social-sign-out-success', "success");
					ref.parentNode.insertBefore(gSignout, ref);
			        break;
				case "linkedIn":
					IN.User.logout(function(){
						$window.localStorage.removeItem('_login_provider');
					 	$rootScope.$broadcast('event:social-sign-out-success', "success");
					}, {});
					break;
				case "facebook":
					FB.logout(function(res){
						$window.localStorage.removeItem('_login_provider');
					 	$rootScope.$broadcast('event:social-sign-out-success', "success");
					});
					break;
			}
		},
		setProvider: function(provider){
			$window.localStorage.setItem('_login_provider', provider);
		}
	}
});

socialLogin.factory("fbService", function($q){
	return {
		login: function(){
			var deferred = $q.defer();
			FB.login(function(res){
				deferred.resolve(res);
			}, {scope: 'email', auth_type: 'rerequest'});
			return deferred.promise;
		},
		getUserDetails: function(){
			var deferred = $q.defer();
			FB.api('/me?fields=name,email,picture', function(res){
				if(!res || res.error){
					deferred.reject('Error occured while fetching user details.');
				}else{
					deferred.resolve(res);
				}
			});
			return deferred.promise;
		}
	}
});

socialLogin.directive("linkedIn", function($rootScope, social, socialLoginService, $window){
	return {
		restrict: 'EA',
		scope: {},
		link: function(scope, ele, attr){
		    ele.on("click", function(){
		  		IN.User.authorize(function(){
					IN.API.Raw("/people/~:(id,first-name,last-name,email-address,picture-url)").result(function(res){
						socialLoginService.setProvider("linkedIn");
						var userDetails = {name: res.firstName + " " + res.lastName, email: res.emailAddress, uid: res.id, provider: "linkedIN", imageUrl: res.pictureUrl};
					console.log(userDetails);
						$rootScope.$broadcast('event:social-sign-in-success', userDetails);
						
				    });
				});
			})
		}
	}
})

socialLogin.directive("gLogin", function($rootScope, $location, $http, SocialLogin, sessionService, social, socialLoginService){
	return {
		restrict: 'EA',
		scope: {},
		replace: true,
		link: function(scope, ele, attr){
			ele.on('click', function(){
		    	if(typeof(scope.gauth) == "undefined")
		    		scope.gauth = gapi.auth2.getAuthInstance();	
	        	scope.gauth.signIn().then(function(googleUser){
	        		var profile = googleUser.getBasicProfile();
	        		var idToken = googleUser.getAuthResponse().id_token
	        		socialLoginService.setProvider("google");
							var idToken = googleUser.getAuthResponse().access_token;
							var userDetails={};
		      		userDetails.access_token=idToken;
							userDetails.gateway='google';
							console.log(userDetails);
							var User = new SocialLogin(userDetails);
							User.$sociallogin({guest_token: sessionService.get("token")}).then(function(data) {
								console.log(data);
								if (data.status == "success") {
									// console.log(data);
									sessionService.set('user', JSON.stringify(data.response));
									sessionService.set('user_token', angular.fromJson(sessionService.get('user')).token);
									$http.defaults.headers.common['Authorization'] = sessionService.get('user_token');
									$location.path("/");
									//$rootScope.$broadcast('event:social-sign-in-success', userDetails);
								}
							});
	        	}, function(err){
	        		console.log(err);
	        	})
	        });
		}
	}
});

socialLogin.directive("fbLogin", function($rootScope, $location, $http, SocialLogin, sessionService, fbService, social, socialLoginService, $window){
	return {
		restrict: 'A',
		scope: {},
		replace: true,
		link: function(scope, ele, attr){
			ele.on('click', function(){
				fbService.login().then(function(res){
					if(res.status == "connected"){
						fbService.getUserDetails().then(function(user){
							socialLoginService.setProvider("facebook");
							var userDetails = {};
							userDetails.access_token=res.authResponse.accessToken;
							userDetails.gateway='fb';
							console.log($window);
							var User = new SocialLogin(userDetails);
							User.$sociallogin({guest_token: sessionService.get("token")}).then(function(data) {
								if (data.status == "success") {
									// console.log(data);
									sessionService.set('user', JSON.stringify(data.response));
									sessionService.set('user_token', angular.fromJson(sessionService.get('user')).token);
									$http.defaults.headers.common['Authorization'] = sessionService.get('user_token');
									$location.path("/");
									//$rootScope.$broadcast('event:social-sign-in-success', userDetails);
								}
							});
						}, function(err){
							console.log(err);
						})
					}
				}, function(err){
					console.log(err);
				});
			});
		}
	}
})
