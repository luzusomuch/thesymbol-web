'use strict';

/**
 * @ngdoc service
 * @name eCommerceUserApp.search
 * @description
 * # search
 * Factory in the eCommerceUserApp.
 */
angular.module('eCommerceUserApp')
  .factory('search', ['$resource', 'endpoint', function($resource, endpoint) {
    return {
	searchProduct:$resource(endpoint+'/users/product/get-products?name=:name', {name:"@name"},{
        'get': { method:'GET' }
    }),
	searchPriceProduct:$resource(endpoint+'/users/product/get-products', null,{
        'get': { method:'GET' }
    })
	};
  }]);