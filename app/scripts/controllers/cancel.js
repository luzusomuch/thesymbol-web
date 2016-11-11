'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:CancelCtrl
 * @description
 * # CancelCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
  .controller('CancelCtrl', ['$routeParams', 'Product', 'Payment', 'Cart', 'Checkout', "$location", "sessionService", 'endpoint', "$scope", "stripe", function($routeParams, Product, Payment, Cart, Checkout, $location, sessionService, endpoint, $scope, stripe) {
        var _this = this;
		
		 
		 
		  var getAdmin = Product.getAdmin;
		  var gA = new getAdmin();
          gA
            .$get({
                guest_token: sessionService.get("token")
            }, function(data) {
                if (data.status == "success") {
                    $scope.admin = data.response;
					
                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })
	}])