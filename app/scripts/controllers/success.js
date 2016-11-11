'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:SuccessCtrl
 * @description
 * # SuccessCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
  .controller('SuccessCtrl', ['$routeParams', 'Product', 'Payment', 'Cart', 'Checkout', "$location", "sessionService", 'endpoint', "$scope", "stripe", function($routeParams, Product, Payment, Cart, Checkout, $location, sessionService, endpoint, $scope, stripe) {
        var _this = this;
		
		 // this.paymentPaypal = function () {
			if(sessionService.get('payment')=='Stripe'){
				sessionService.destroy('payment');
				sessionService.destroy('coupon');
				sessionService.destroy('coupon_amount');
				_this.success=true;
				_this.error=false;
			}
			else if(sessionService.get('payment')=='Paypal')
			{
				
				var saveOrder = Payment.saveOrder;
				var sO = new saveOrder({
						guest_token: sessionService.get("token"),
						payment_id: $routeParams.tx,
						payment_status: $routeParams.st,
						payment_method: "paypal",
						coupon: sessionService.get('coupon'),
						shipping: sessionService.get('ship_address'),
						billing: sessionService.get('ship_address')
						
					});
				sO
					.$get(function(data) {
						if (data.status == "success") {
							sessionService.destroy('payment');
				sessionService.destroy('coupon');
				sessionService.destroy('coupon_amount');
							_this.success = data;
							_this.error = false;
							// $location.path('order');
						}
					}, function(data) {
						if (data.status == "401") {
							sessionService.get("token");
						}
					})
			}
			else if(sessionService.get('payment_error')=='yes'){
				sessionService.destroy('payment_error');
				_this.error=true;
			}
			else
			{
				
				 $location.path('order');
			}
		 // }
		 
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