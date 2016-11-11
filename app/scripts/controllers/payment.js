'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:PaymentCtrl
 * @description
 * # PaymentCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
    .controller('PaymentCtrl', ['$routeParams', 'dpath', 'Product', 'Payment', 'Cart', 'Checkout', "$location", "sessionService", 'endpoint', "$scope", "stripe", function($routeParams, dpath, Product, Payment, Cart, Checkout, $location, sessionService, endpoint, $scope, stripe) {
        var _this = this;
		
		if(sessionService.get('coupon'))
		{
			_this.discount={};
			_this.discount.amount=sessionService.get('coupon_amount');
			_this.csuccess=sessionService.get('coupon');
		}
		
		this.payment = function () {
			var saveOrder = Payment.saveOrder;
			var sO = new saveOrder();
			sO
				.$get({
					guest_token: sessionService.get("token"),
					payid: $routeParams.tx,
					status: $routeParams.st
				}, function(data) {
					if (data.status == "success") {
						_this.success = data;
						$location.path('order');
					}
				}, function(data) {
					if (data.status == "401") {
						sessionService.get("token");
					}
				})
		}
		
		
		
    }])