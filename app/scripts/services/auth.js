'use strict';

/**
 * @ngdoc service
 * @name eCommerceUserApp.Auth
 * @description
 * # Auth
 * Factory in the eCommerceUserApp.
 */
angular.module('eCommerceUserApp')
  .factory('sessionService', ['$cookieStore', function($cookieStore) {
    return {
      set: function(key, value) {
        return $cookieStore.put(key, value);
      },
      get: function(key) {
        return $cookieStore.get(key);
      },
      destroy: function(key) {
        return $cookieStore.remove(key);
      }
    };
  }])

