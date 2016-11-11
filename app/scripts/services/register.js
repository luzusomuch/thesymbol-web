'use strict';

/**
 * @ngdoc service
 * @name eCommerceUserApp.Register
 * @description
 * # Register
 * Factory in the eCommerceUserApp.
 */
angular.module('eCommerceUserApp')
  .factory('Register', ['$resource', 'endpoint', function($resource, endpoint) {
    return $resource(endpoint+'/users/register', null,
    {
        'register': { method:'POST' }
    });
  }]);
