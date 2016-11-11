'use strict';

/**
 * @ngdoc service
 * @name eCommerceUserApp.Category
 * @description
 * # Category
 * Factory in the eCommerceUserApp.
 */
angular.module('eCommerceUserApp')
  .factory('Category', ['$resource', 'endpoint', 'sessionService', function($resource, endpoint, sessionService) {
    return {
      getCategory: $resource(endpoint + '/users/category/get-categories', null, {
        'get': {
          method: 'GET'
        }
      }),
	  getCategoryProduct: $resource(endpoint + '/products/features',  null, {
        'get': {
          method: 'GET'
        }
      }),
	  getPage: $resource(endpoint + '/pages/:id',  {id:"@id"}, {
        'get': {
          method: 'GET'
        }
      })
    };
  }]);
