'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:InviteFriendCtrl
 * @description
 * # InviteFriendCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp').controller('InviteFriendCtrl', ['$scope', 'growl', function($scope, growl) {
	this.inviteFriend = (type) => {
		if (type==='google') {
			var auth2 = gapi.auth2.getAuthInstance();
			auth2.signIn().then(() => {
				window.gapi.client.plus.people.list({
			  	'userId' : 'me',
			  	'collection' : 'visible'
				}).execute(resp => {
					if (resp.error) {
						growl.error('Something went wrong');
					} else {
						let friends = [];
						_.each(resp.items, (item) => {
							if (item.objectType==='person') {
								window.gapi.client.plus.people.get({userId: item.id}).execute(profile => {
									friends.push(profile);
								});
							}
						});
						console.log(friends);
					}
				});
			});
		} else if (type==='facebook') {
			window.FB.login(function(resp) {
		    if (resp.authResponse) {
		    	FB.api('/me/friends', (resp) => {
		    		console.log(resp);
		    	});
		    }
			});
		}
	};

}]);
