'use strict';

/**
 * @ngdoc service
 * @name eCommerceUserApp.Account
 * @description
 * # Account
 * Factory in the eCommerceUserApp.
 */
angular.module('eCommerceUserApp')
  .factory('Account', ['$routeParams','$resource', 'endpoint', 'sessionService', function($routeParams,$resource, endpoint, sessionService) {
    return {
      getDetails: $resource(endpoint + '/users/account/get-details', null, {
        'get': {
          method: 'GET'
        }
      }),
	  getSingleAddress: $resource(endpoint + '/users/account/get-address/:id', {id:'@id'}, {
        'get': {
          method: 'GET'
        }
      }),
	  saveDetails: $resource(endpoint + '/users/account/update', null, {
        'get': {
          method: 'PUT'
        }
      }),
	  putAddress: $resource(endpoint + '/users/account/update-address/:id', {id:'@_id'}, {
        'get': {
          method: 'PUT'
        }
      }),
	  deleteAddress: $resource(endpoint + '/users/account/remove-address/:id', {id:'@id'}, {
        'get': {
          method: 'DELETE'
        }
      }),
	  updatePassword: $resource(endpoint + '/users/account/change-password', null, {
        'get': {
          method: 'POST'
        }
      })
	}
  }]);
