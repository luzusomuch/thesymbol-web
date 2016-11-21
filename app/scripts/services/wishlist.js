'use strict';

/**
 * @ngdoc service
 * @name eCommerceUserApp.Wishlist
 * @description
 * # Wishlist
 * Factory in the eCommerceUserApp.
 */
angular.module('eCommerceUserApp')
	.factory('Wishlist', ['$routeParams','$resource', 'endpoint', 'sessionService', function($routeParams,$resource, endpoint, sessionService) {

	return {
		addWishlist: $resource(endpoint + '/users/wishlist/add-wishlist', null, {
			'get': {
				method: 'POST'
			}
		}),
		getWishlist: $resource(endpoint + '/users/wishlist/get-wishlist', {user_id:"@user_id"}, {
	        'get': {
	        	method: 'GET'
	        }
	    }),
	    deleteWishlist: $resource(endpoint + '/users/wishlist/delete-wishlist', null, {
			'get': {
				method: 'GET'
			}
		}),
		checkWishlist: $resource(endpoint + '/users/wishlist/check-wishlist', null, {
			'get': {
				method: 'GET'
			}
		})
	};

}]);