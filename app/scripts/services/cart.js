'use strict';

/**
 * @ngdoc service
 * @name eCommerceUserApp.Cart
 * @description
 * # Cart
 * Factory in the eCommerceUserApp.
 */
angular.module('eCommerceUserApp')
  .factory('Cart', ['$routeParams','$resource', 'endpoint', 'sessionService', '$http', function($routeParams,$resource, endpoint, sessionService,$http) {
	
    return {
      getCart: $resource(endpoint + '/users/cart/get-product', null, {
        'get': {
          method: 'GET'
        }
      }),
	  AddtoCart: $resource(endpoint + '/users/cart/add-product', null, {
        'get': {
          method: 'POST'
        }
      }),
	  UpdateToCart: $resource(endpoint + '/users/cart/update-product', null, {
        'get': {
          method: 'POST'
        }
      }),
	  RemoveCart: $resource(endpoint + '/users/cart/remove-product', null, {
        'get': {
          method: 'DELETE'
        }
      }),
	  CheckCoupon: $resource(endpoint + '/coupons/is-valid/:coupon', {coupon:'@coupon'}, {
        'get': {
          method: 'GET'
        }
      }),
	   parseFeed : function(url){
			return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
		}
	}
  }]);
     