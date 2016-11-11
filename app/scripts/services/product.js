'use strict';

/**
 * @ngdoc service
 * @name eCommerceUserApp.Product
 * @description
 * # Product
 * Factory in the eCommerceUserApp.
 */
angular.module('eCommerceUserApp')
  .factory('Product', ['$routeParams','$resource', 'endpoint', 'sessionService', function($routeParams,$resource, endpoint, sessionService) {
	
    return {
      getTopProducts: $resource(endpoint + '/users/product/get-products', null, {
        'get': {
          method: 'GET'
        }
      }),
      getBestSeller: $resource(endpoint + '/users/product/best-sellers', null, {
        'get': {
          method: 'GET'
        }
      }),
       getTopRated: $resource(endpoint + '/users/product/top-rated', null, {
        'get': {
          method: 'GET'
        }
      }),
      getBestOffer: $resource(endpoint + '/users/product/best-offers', null, {
        'get': {
          method: 'GET'
        }
      }),
     getPopular: $resource(endpoint + '/users/product/popular', null, {
        'get': {
          method: 'GET'
        }
      }),
     detailsProduct: $resource(endpoint + '/users/product/get-single-product/:id', {id:"@id"}, {
        'get': {
          method: 'GET'
        }
      }),
     cateProduct: $resource(endpoint + '/users/product/get-products?category=:category', {category:"@category"}, {
        'get': { 
          method: 'GET'
        }
      }),
     AddtoCart: $resource(endpoint + '/users/cart/add-product', null, {
        'get': {
          method: 'POST'
        }
      }),
     priceProduct: $resource(endpoint + '/users/product/get-products?category=:category', {category:"@category"}, {
        'get': {
          method: 'GET'
        }
      }),
     getAllProducts: $resource(endpoint + '/users/product/get-products', null, {
        'get': {
          method: 'GET'
        }
      }),
     getRecentProducts: $resource(endpoint + '/users/product/get-products', null, {
        'get': {
          method: 'GET'
        }
      }),
     checkReview: $resource(endpoint + '/users/product/check-review/:id/:oid', {id:"@id",oid:"@oid"}, {
        'get': {
          method: 'GET'
        }
      }),
      saveReview: $resource(endpoint + '/users/product/save-review/:id/:oid', {id:"@id",oid:"@oid"}, {
        'get': {
          method: 'POST'
        }
      }),
      addReturn: $resource(endpoint + '/users/product/add-return/:id/:oid', {id:"@id",oid:"@oid"}, {
        'get': {
          method: 'POST'
        }
      }),
      reviewDetails: $resource(endpoint + '/users/product/get-review/:id', {id:"@id"}, {
        'get': {
          method: 'GET'
        }
      }),
      detailsReturnProduct: $resource(endpoint + '/users/product/get-returnproduct/:id/:oid', {id:"@id",oid:"@oid"}, {
        'get': {
          method: 'GET'
        }
      }),
      getRecentViewProducts: $resource(endpoint + '/users/product/get-products', null, {
        'get': {
          method: 'GET'
        }
      }),
	  shopList: $resource(endpoint + '/users/get-sellers', null, {
        'get': {
          method: 'GET'
        }
      }),
	  shopTop: $resource(endpoint + '/users/product/by/seller/:id/top-products', {id:"@id"}, {
        'get': {
          method: 'GET'
        }
      }),
	  shopProducts: $resource(endpoint + '/users/product/get-products', {id:"@id"}, {
        'get': {
          method: 'GET'
        }
      }),
	  getAdmin: $resource(endpoint + '/admin/settings', null, {
        'get': {
          method: 'GET'
        }
      })
    };
  }]);
