'use strict';

/**
 * @ngdoc service
 * @name eCommerceUserApp.Rating
 * @description
 * # Rating
 * Factory in the eCommerceUserApp.
 */
angular.module('eCommerceUserApp')
	.factory('Rating', ['$routeParams','$resource', 'endpoint', 'sessionService', function($routeParams,$resource, endpoint, sessionService) {

	return {
		addReview: $resource(endpoint + '/ratings/add-review', null, {
			'get': {
				method: 'POST'
			}
		}),
	};

}]);