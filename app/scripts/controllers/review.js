'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:ReviewCtrl
 * @description
 * # ReviewCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
  .controller('ReviewCtrl', ['$routeParams', 'Product', 'Payment', 'Cart', 'Checkout', "$location", "sessionService", 'endpoint', "$scope", "stripe", function($routeParams, Product, Payment, Cart, Checkout, $location, sessionService, endpoint, $scope, stripe) {
        var _this = this;

        this.close = function() {
            _this.error = '';
            _this.success = '';
        }
		_this.re = {};
		
		 $scope.isReadonly = false; // default test value
        $scope.changeOnHover = false; // default test value 
        $scope.maxValue = 5; // default test value
        $scope.ratingValue = 0; // default test value 
        _this.re.stars = $scope.ratingValue; // default test value 


            var checkReview = new Product.checkReview({
                id: $routeParams.pid,
                oid: $routeParams.oid
            });
            checkReview
                .$get(function(data) {
                    if (data.response.rating == null) {
                        _this.review = 'active';
                    } else {
                        $scope.ratingValue=data.response.rating.stars;
						_this.re.stars = $scope.ratingValue;
						_this.re=data.response.rating
                    }
                }, function(data) {
                    if (data.status == "401") {
                        sessionService.get("token");
                    }
                })

        this.saveReview = function() {
            _this.re.stars = parseInt($('#stars').val());
            var saveReview = new Product.saveReview(_this.re);
            saveReview
                .$get({
                    id: $routeParams.pid,
                    oid: $routeParams.oid
                }, function(data) {
                     $location.path('product/'+$routeParams.pid)
                })
        }
	}])