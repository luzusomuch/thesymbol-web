'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:CartCtrl
 * @description
 * # CartCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
    .controller('CartCtrl', ['$routeParams', 'Product', 'Cart', "$location", "sessionService", "$scope", function($routeParams, Product, Cart, $location, sessionService, $scope) {

        var _this = this;

        this.close = function() {
            _this.status = '';
            _this.success = {};
            _this.success.status = '';
        }
		
		this.range = function(min, max, step){
			step = step || 1;
			var input = [];
			for (var i = min; i <= max; i += step) input.push(i);
			return input;
		};
        
		if(sessionService.get('coupon'))
		{
			_this.discount={};
			_this.discount.amount=sessionService.get('coupon_amount');
			_this.csuccess=sessionService.get('coupon');
		}
		
		var getCart = Cart.getCart;
        var gC = new getCart();
        gC
            .$get({
                guest_token: sessionService.get("token")
            }, function(data) {
                if (data.status == "success") {
                    _this.carts = data.response.cart;
                    var total = 0;
                    var ship = 0;
                    _this.carts.forEach(function(product) {
							total += product.selected_pricing.after_discount * product.product_quantity;
							if(product.product_id.paid_by_buyer==true)
							ship += product.product_id.shipping_details.fee;
							else
								ship +=0;
							
                    });
                    _this.totalprice = total;
                    _this.shipprice = ship;
                    _this.overprice = ship + total;
					_this.pageLoading=false;
                }
				else
				{
					 _this.carts = [];
                    $scope.carts = [];
					_this.pageLoading=false;
					if(data.statusMessage=='Unauthorized'){
					sessionService.destroy('token');
					sessionService.destroy('user');
					sessionService.destroy('user_token');
					$location.path("#/login");
					}
				}
            }, function(data) {
                    if (data.status == "401") {
                        sessionService.get("token");
                    }
                })

		
        this.checkCoupon = function() {
			var cC = new Cart.CheckCoupon({coupon:_this.coupon});
            cC
                .$get({
                    guest_token: sessionService.get("token")
                }, function(data) {
					if(data.status=='success'){
						sessionService.set('coupon',_this.coupon);
						_this.discount=data.response;
						_this.csuccess=_this.coupon;
						sessionService.set('coupon_amount',_this.discount.amount);
						_this.cerror="";
					}
					else{
						sessionService.destroy('coupon');
						sessionService.destroy('coupon_amount');
						_this.cerror=data.statusMessage;
						_this.discount=0;
						_this.csuccess='';
					}
				})
		}
		
		this.removeCoupon = function() {
			sessionService.destroy('coupon');
			sessionService.destroy('coupon_amount');
			_this.discount=0;
			_this.csuccess='';
			_this.coupon='';
		}
		
        this.removeCart = function(pid) {
            _this.dataLoading = true;
            var Cup = new Cart.RemoveCart();
            Cup
                .$get({
                    guest_token: sessionService.get("token"),
                    cart_id: pid
                }, function(data) {
                    if (data.status == "success") {
                        _this.successs = data;
                        var gC = new Cart.getCart();
                        gC.$get({
                            guest_token: sessionService.get("token")
                        }, function(data) {
                            if (data.status == "success") {
                                $scope.header.carts = data.response.cart;
                                _this.carts = data.response.cart;
                                var total = 0;
                                var ship = 0;
                                _this.carts.forEach(function(product) {
                                    total += product.product_id.pricing.after_discount * product.product_quantity;
                                    if(product.product_id.paid_by_buyer==true)
									ship += product.product_id.shipping_details.fee;
									else
										ship +=0;
                                });
                                $scope.header.totalprice = total;
                                _this.totalprice = total;
                                _this.shipprice = ship;
                                _this.overprice = ship + total;
                                _this.dataLoading = false;
								_this.success=_this.successs;
                            }
                        })
                    }
                }, function(data) {
                    if (data.status == "401") {
                        sessionService.get("token");
                    }
                })
        }

		
		var getBestOffer = Product.getBestOffer;
			var gBO = new getBestOffer();
			gBO
				.$get(function(data) {
					if (data.status == "success") {
						 _this.bestO = data.response.product;
                    for (var i = 0; i < _this.bestO.length; i++) {
                        var item = _this.bestO[i];
                        _this.bestO[i].totalOffer = ((item.pricing.original - item.pricing.after_discount) / item.pricing.original) * 100;
                    }
						_this.best_offer = _this.bestO;
					}
				}, function(data) {
					if (data.status == "401") {
						sessionService.get("token");
					}
				});
					
					
        this.updateCart = function(newval,pid) {
            _this.dataLoading = true;
            $scope.carts = [];
            var Cup = new Cart.UpdateToCart({
                product_id: pid,
                quantity: newval
            });
            Cup
                .$get({
                    guest_token: sessionService.get("token")
                }, function(data) {
					if(data.statusMessage=='Unauthorized')
					$location.path("#/login");
                    if (data.status == "success") {
						
                        _this.successs = data;
                        var gC = new Cart.getCart();
                        gC.$get({
                            guest_token: sessionService.get("token")
                        }, function(data) {
                            if (data.status == "success") {
                                $scope.header.carts = data.response.cart;
                                _this.carts = data.response.cart;
                                var total = 0;
                                var ship = 0;
                                _this.carts.forEach(function(product) {
                                    total += product.product_id.pricing.after_discount * product.product_quantity;
                                    if(product.product_id.paid_by_buyer==true)
									ship += product.product_id.shipping_details.fee;
									else
										ship +=0;
                                });
                                $scope.header.totalprice = total;
                                _this.totalprice = total;
                                _this.shipprice = ship;
                                _this.overprice = ship + total;
                                _this.dataLoading = false;
								_this.success=_this.successs;
                            }
                        })
                    }
                }, function(data) {
                    if (data.status == "401") {
                        _this.dataLoading = false;
                        sessionService.get("token");
                    }
                })
        }
		
		 $scope.$on('ngRepeatFinishedcart1', function(ngRepeatFinishedEvent) {
			$("#owl-demo").owlCarousel({
 
			  autoPlay: 3000, //Set AutoPlay to 3 seconds
		 
			  items : 4,
			  itemsDesktop : [1199,3],
			  itemsDesktopSmall : [979,3],
			  navigation: true,
			  pagination: false,
				navigationText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
		 
			});
		 });
		$scope.$on('ngRepeatFinishedcart2', function(ngRepeatFinishedEvent) {
			$("#owl-demo2").owlCarousel({
		 
			  autoPlay: 3000, //Set AutoPlay to 3 seconds
		 
			  items : 4,
			  itemsDesktop : [1199,3],
			  itemsDesktopSmall : [979,3],
			  navigation: true,
			  pagination: false,
				navigationText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
		 
			});
  
		});
    }]);