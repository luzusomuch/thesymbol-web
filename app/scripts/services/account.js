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
          method: 'GET',
          headers: {
            Authorization: sessionService.get('user_token')
          }
        }
      }),
      getSingleAddress: $resource(endpoint + '/users/account/get-address/:id', {id:'@id'}, {
        'get': {
          method: 'GET',
          headers: {
            Authorization: sessionService.get('user_token')
          }
        }
      }),
      saveDetails: $resource(endpoint + '/users/account/update', null, {
        'get': {
          method: 'PUT',
          headers: {
            Authorization: sessionService.get('user_token')
          }
        }
      }),
      putAddress: $resource(endpoint + '/users/account/update-address/:id', {id:'@_id'}, {
        'get': {
          method: 'PUT',
          headers: {
            Authorization: sessionService.get('user_token')
          }
        }
      }),
      deleteAddress: $resource(endpoint + '/users/account/remove-address/:id', {id:'@id'}, {
        'get': {
          method: 'DELETE',
          headers: {
            Authorization: sessionService.get('user_token')
          }
        }
      }),
      updatePassword: $resource(endpoint + '/users/account/change-password', null, {
        'get': {
          method: 'POST',
          headers: {
            Authorization: sessionService.get('user_token')
          }
        }
      })
	}
  }]);
