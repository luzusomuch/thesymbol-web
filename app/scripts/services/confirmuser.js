'use strict';

/**
 * @ngdoc service
 * @name eCommerceUserApp.ConfirmUser
 * @description
 * # ConfirmUser
 * Factory in the eCommerceUserApp.
 */
angular.module('eCommerceUserApp')
  .factory('ConfirmUser', ['$routeParams','$resource', 'endpoint', 'sessionService', function($routeParams,$resource, endpoint, sessionService) {
    return {
      confirmCheck: $resource(endpoint + '/users/confirmuser/'+$routeParams.id, null, {
        'get': {
          method: 'GET'
        }
      })
    };
  }]);