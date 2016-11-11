'use strict';

/**
 * @ngdoc service
 * @name eCommerceUserApp.User
 * @description
 * # User
 * Factory in the eCommerceUserApp.
 */
angular.module('eCommerceUserApp')
  .factory('UserAuth', ['$resource', 'endpoint', 'sessionService', function($resource, endpoint, sessionService) {
    return $resource(endpoint+'/users/login', null,
    {
        'login': { method:'POST' }
    });
  }]);

