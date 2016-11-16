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
		saveWishlist: $resource(endpoint + '/users/product/save-review/:id/:pid', {id:"@id",oid:"@pid"}, {
			'get': {
				method: 'POST'
			}
		}),
    };
  }]);