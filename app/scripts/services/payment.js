'use strict';

/**
 * @ngdoc service
 * @name eCommerceUserApp.Payment
 * @description
 * # Payment
 * Factory in the eCommerceUserApp.
 */
angular.module('eCommerceUserApp')
   .factory('Payment', ['$routeParams','$resource', 'endpoint', 'sessionService', function($routeParams,$resource, endpoint, sessionService) {
    return {
      saveOrder: $resource(endpoint + '/users/checkout/buy-cart-completed', null, {
        'get': {
          method: 'POST',
		  headers: {"Authorization":sessionService.get('user_token')}
        }
      }),
	  openDownload: $resource(endpoint + '/users/order/digital-products/:id', {id:"@id"}, {
        'get': {
          method: 'GET',
		  headers: {"Authorization":sessionService.get('user_token')}
        }
      })
	}
  }]);
