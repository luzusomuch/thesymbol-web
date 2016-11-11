'use strict';

/**
 * @ngdoc service
 * @name eCommerceUserApp.SocialLogin
 * @description
 * # SocialLogin
 * Factory in the eCommerceUserApp.
 */
angular.module('eCommerceUserApp')
  .factory('SocialLogin', ['$resource', 'endpoint', function($resource, endpoint) {
    return $resource(endpoint+'/users/social_login', null,
    {
        'sociallogin': { method:'POST' }
    });
  }]);
