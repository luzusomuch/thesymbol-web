'use strict';

/**
 * @ngdoc service
 * @name eCommerceUserApp.newPassword
 * @description
 * # newPassword
 * Factory in the eCommerceUserApp.
 */
angular.module('eCommerceUserApp')
  .factory('newPassword', ['$routeParams','$resource', 'endpoint', 'sessionService', function($routeParams,$resource, endpoint, sessionService) {
     return $resource(endpoint+'/users/newpassword/'+$routeParams.id, null,
    {
        'newpassword': { method:'POST' }
    });
  }]);
