'use strict';

/**
 * @ngdoc service
 * @name eCommerceUserApp.Main
 * @description
 * # Main
 * Factory in the eCommerceUserApp.
 */
angular.module('eCommerceUserApp')
 .factory('Main', ['$routeParams','$resource', 'endpoint', 'sessionService', function($routeParams,$resource, endpoint, sessionService) {
	 console.log($resource);
    return {
      getHomepage: $resource(endpoint + '/admin/home-page-settings', null, {
        'get': {
          method: 'GET'
        }
      }),
	  getCountry: $resource(endpoint + '/countries', null, {
        'get': {
          method: 'GET'
		  }
      })
	}
 }]);