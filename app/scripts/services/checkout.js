'use strict';

/**
 * @ngdoc service
 * @name eCommerceUserApp.Checkout
 * @description
 * # Checkout
 * Factory in the eCommerceUserApp.
 */
angular.module('eCommerceUserApp')
  .factory('Checkout', ['$routeParams','$resource', 'endpoint', 'sessionService', function($routeParams,$resource, endpoint, sessionService) {
    return {
      addAddress: $resource(endpoint + '/users/account/add-address', null, {
        'get': {
          method: 'POST',
          headers: {
            Authorization: sessionService.get('user_token')
          }
        }
      }),
	  addBillAddress: $resource(endpoint + '/users/checkout/add-billaddress', null, {
        'get': {
          method: 'POST',
          headers: {
            Authorization: sessionService.get('user_token')
          }
        }
      }),
	  getAddress: $resource(endpoint + '/users/checkout/get-address', null, {
        'get': {
          method: 'GET',
          headers: {
            Authorization: sessionService.get('user_token')
          }
        }
      })
	}
  }]);
