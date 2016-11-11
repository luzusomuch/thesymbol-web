'use strict';

/**
 * @ngdoc service
 * @name eCommerceUserApp.Forgot
 * @description
 * # Forgot
 * Factory in the eCommerceUserApp.
 */
angular.module('eCommerceUserApp')
  .factory('Forgot', ['$resource', 'endpoint', function($resource, endpoint) {
    return $resource(endpoint+'/users/forgot', null,
    {
        'forgot': { method:'POST' }
    });
  }]);