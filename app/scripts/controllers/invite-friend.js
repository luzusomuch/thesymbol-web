'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:InviteFriendCtrl
 * @description
 * # InviteFriendCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp').controller('InviteFriendCtrl', ['$scope', 'growl', function($scope, growl) {
	
	this.inviteFriend = function(type) {
		if (type==='google') {
			var auth2 = gapi.auth2.getAuthInstance();
			auth2.signIn().then(function() {
				window.gapi.client.plus.people.list({
			  	'userId' : 'me',
			  	'collection' : 'visible'
				}).execute(function(resp) {
					if (resp.error) {
						growl.error('Something went wrong');
					} else {
						var friends = [];
						_.each(resp.items, function(item) {
							if (item.objectType==='person') {
								window.gapi.client.plus.people.get({userId: item.id}).execute(function(profile) {
									friends.push(profile);
								});
							}
						});
						console.log(friends);
						growl.success('Invite friends successfully');
					}
				});
			});
		} else if (type==='facebook') {
			window.FB.login(function(resp) {
		    if (resp.authResponse) {
		    	FB.api('/me/friends', function(resp) {
		    		console.log(resp);
		    		growl.success('Invite friends successfully');
		    	});
		    }
			});
		} else if (type==='twitter') {
			growl.success('Invite friends successfully');
		}
	};

}]);
