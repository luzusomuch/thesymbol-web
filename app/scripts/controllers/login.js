'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
    .controller('LoginCtrl', ['$http', '$routeParams', 'UserAuth', 'ConfirmUser', 'sessionService', '$location', '$scope', function($http, $routeParams, UserAuth, ConfirmUser, sessionService, $location, $scope) {
        var _this = this;
		
		_this.login={"email":sessionService.get('remail'),"password":sessionService.get('rpass')};
		_this.success= angular.fromJson(sessionService.get('success'));
		sessionService.destroy('success');
        this.close = function() {
            _this.error = '';
            _this.success = '';
        }
		
		
        this.loginAsUser = function() {
            _this.dataLoading = true;
            var User = new UserAuth(_this.login);
            User.$login({
                guest_token: sessionService.get("token")
            }).then(function(data) {
                if (data.status == "success") {
					// if(document.getElementById('remember').checked==true){
					 // sessionService.set('remail', _this.login.email);
					 // sessionService.set('rpass', _this.login.password);
					// }
                    sessionService.set('user', JSON.stringify(data.response.user));
                    sessionService.set('user_token', angular.fromJson(sessionService.get('user')).token);
                    $http.defaults.headers.common['Authorization'] = sessionService.get('user_token');
                    $location.path("/");
                } else {
                    _this.dataLoading = false;
                    _this.error = data;
                }
            });
        }
		
        this.confirmAsUser = function() {
            var CUser = new ConfirmUser.confirmCheck($routeParams.id);
            CUser
                .$get(function(data) {
                    if (data.status == "success") {
                        _this.success = data;
                    } else
                        _this.error = data;
                }, function(data) {
                    if (data.status == "401") {
                        sessionService.get("token");
                    }
                })
        }
		
		
        this.logout = function() {
            sessionService.destroy('token');
            sessionService.destroy('user');
            sessionService.destroy('user_token');
            $location.path("#/login");
        }

        if ($routeParams.id != undefined)
            this.confirmAsUser();
    }])
	