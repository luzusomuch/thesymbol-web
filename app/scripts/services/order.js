'use strict';

/**
 * @ngdoc service
 * @name eCommerceUserApp.Order
 * @description
 * # Order
 * Factory in the eCommerceUserApp.
 */
angular.module('eCommerceUserApp')
   .factory('Order', ['$routeParams','$resource', 'endpoint', 'sessionService', function($routeParams,$resource, endpoint, sessionService) {
    return {
      getOrder: $resource(endpoint + '/users/order/get-order', null, {
        'get': {
          method: 'GET',
		  headers: {"Authorization":sessionService.get('user_token')}
        }
      })
	}
  }]);
	  