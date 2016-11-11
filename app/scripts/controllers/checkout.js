'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
    .controller('CheckoutCtrl', ['$routeParams', 'Account', 'dpath', 'Product', 'Payment', 'Main', 'Cart', 'Checkout', "$location", "sessionService", 'endpoint', "$scope", "$timeout", "stripe", function($routeParams, Account, dpath, Product, Payment, Main, Cart, Checkout, $location, sessionService, endpoint, $scope, $timeout, stripe) {
		
        var _this = this;
		
		this.close = function() {
            _this.error = '';
        }
		
		if(sessionService.get('coupon'))
		{
			_this.discount={};
			_this.discount.amount=sessionService.get('coupon_amount');
			_this.csuccess=sessionService.get('coupon');
		}
		
		var getCountry = Main.getCountry;
        var gC = new getCountry();
        gC.$get(function(data) {
			_this.country=data.response;
		});
		
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

				
        var getAddress = Checkout.getAddress;
        var gA = new getAddress();
        gA
            .$get({
                guest_token: sessionService.get("token")
            }, function(data) {
                if (data.status == "success") {
						_this.addresss = data.response.address;
						_this.cuser = data.response;
                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })

        
		this.saveAddress =function () {
			_this.pageLoading=true;
			var addAddress = Checkout.addAddress;
			var addAddress = new addAddress(_this.address);
            addAddress.$get({
                guest_token: sessionService.get("token")
            }).then(function(data) {
				if (data.status == "success") {
					 var getAddress = Checkout.getAddress;
						var gA = new getAddress();
						gA
							.$get({
								guest_token: sessionService.get("token")
							}, function(data) {
								if (data.status == "success") {
									
										_this.addresss = data.response.address;
										_this.cuser = data.response;
										_this.add_ship="last";
										_this.pageLoading=false;
								}
							}, function(data) {
								if (data.status == "401") {
									sessionService.get("token");
								}
							})
				}
			});
			
		}
		
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
			
		this.Continue =function () {
			if(_this.add_ship==undefined || _this.add_ship=='first' || _this.add_ship=='last' ){
					_this.error="error"; 
					angular.element(document.querySelector("#saddr")).addClass("animated shake")
					 window.setTimeout(function() { angular.element(document.querySelector("#saddr")).removeClass("animated shake"); }, 1000); 
					  return false;
				}
			else
			{
				sessionService.set('ship_address',_this.add_ship);
				// $location.path("/payment");
				_this.pageLoading=true;
				var getSingleAddress = Account.getSingleAddress;
					var gD = new getSingleAddress({id:_this.add_ship});
					gD
						.$get({
							guest_token: sessionService.get("token")
						}, function(data) {
												
					if(data.statusMessage=='Unauthorized')
								$location.path("/login");
							if (data.status == "success") {
								_this.shipaddress = data.response.address[0];
								_this.pageLoading=false;
								_this.payment=true;
								_this.ship=true;
								
							}
						}, function(data) {
							if (data.status == "401") {
								sessionService.get("token");
							}
						})
				
				
			}
		}
		
		
		
		this.updateAddress = function(aid) {
			_this.pageLoading=true;
			var putAddress = Account.putAddress;
			var putAddress = new putAddress(_this.edit);
            putAddress.$get({
                guest_token: sessionService.get("token")
            }).then(function(data) {
				if (data.status == "success") {
					_this.csuccess=data;
					var getDetails = Account.getDetails;
					var gD = new getDetails();
					gD
						.$get({
							guest_token: sessionService.get("token")
						}, function(data) {
						
					if(data.statusMessage=='Unauthorized')
								$location.path("/login");
							if (data.status == "success") {
								_this.addresss = data.response.address;
								_this.cuser = data.response;
								$('#editaddress').trigger('click');
								_this.pageLoading=false;
								_this.success=_this.csuccess;
							}
						}, function(data) {
							if (data.status == "401") {
								sessionService.get("token");
							}
						})
				}
			})
		}

		this.editShow = function(aid) {
				_this.pageLoading=true;
				var getSingleAddress = Account.getSingleAddress;
					var gD = new getSingleAddress({id:aid});
					gD
						.$get({
							guest_token: sessionService.get("token")
						}, function(data) {
												
					if(data.statusMessage=='Unauthorized')
								$location.path("/login");
							if (data.status == "success") {
								_this.pageLoading=false;
								_this.edit = data.response.address[0];
							}
						}, function(data) {
							if (data.status == "401") {
								sessionService.get("token");
							}
						})
			
		}

		
		
		this.addAddress = function(aid) {
			_this.pageLoading=true;
			var addAddress = Checkout.addAddress;
			var addAddress = new addAddress(_this.add);
            addAddress.$get({
                guest_token: sessionService.get("token")
            }).then(function(data) {
				if (data.status == "success") {
					_this.ssuccess=data;
					var getDetails = Account.getDetails;
					var gD = new getDetails();
					gD
						.$get({
							guest_token: sessionService.get("token")
						}, function(data) {
						
					if(data.statusMessage=='Unauthorized')
								$location.path("/login");
							if (data.status == "success") {
								_this.addresss = data.response.address;
								_this.cuser = data.response;
								_this.add='';
								$('#addaddress').trigger('click');
								
								_this.pageLoading=false;
								_this.success=_this.ssuccess;
							}
						}, function(data) {
							if (data.status == "401") {
								sessionService.get("token");
							}
						})
				}
			})
		}
		
		this.changeShipAddress = function() {
			_this.payment=false;
			_this.shipaddress=false;
			_this.review=false;
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
					sessionService.destroy('token');
					sessionService.destroy('user');
					sessionService.destroy('user_token');
					$location.path("#/login");
				}
            }, function(data) {
                    if (data.status == "401") {
                        sessionService.get("token");
                    }
                })

        
		Stripe.setPublishableKey('pk_test_Ny36HAIYzTRPj2oCQkBQ10IY')
		this.onSubmit = function () {
			_this.pageLoading=true;
		};
		$scope.handleStripe = function(status, result){
			$scope.processing = false;
			_this.hideAlerts();
			if (result.error) {
				_this.pageLoading=false;
				$scope.stripeError = result.error.message;
			} else {
				
				$scope.stripeToken = result.id;
				_this.payment=false;
				_this.review=true;
				_this.pageLoading=false;
			}
		};
		
		this.stripePay = function () {
			_this.pageLoading=true;
			sessionService.set('payment','Stripe');
				var saveOrder = Payment.saveOrder;
				var sO = new saveOrder({
						guest_token: sessionService.get("token"),
						payment_id: $scope.stripeToken,
						payment_status: "Completed",
						payment_method: "stripe",
						coupon: sessionService.get('coupon'),
						shipping: sessionService.get('ship_address'),
						billing: sessionService.get('ship_address')
						
					});
				sO
					.$get(function(data) {
						if (data.status == "success") {
							_this.pageLoading=false;	
							_this.success = data;
							$location.path('success');
						}
						else
						{
							sessionService.destroy('payment');
							sessionService.set('payment_error','yes');
							_this.pageLoading=false;
							$scope.stripeError = "Your Payment error! ";
							$location.path('success');
						}
					}, function(data) {
						if (data.status == "401") {
							sessionService.get("token");
						}
					})
		}

		this.hideAlerts = function () {
			$scope.stripeError = null;
			$scope.stripeToken = null;
		};
		
		
		this.addFormFields = function(form, data) {
            if (data != null) {
                $.each(data, function(name, value) {
                    if (value != null) {
                        var input = $("<input></input>").attr("type", "hidden").attr("name", name).val(value);
                        form.append(input);
                    }
                });
            }
        }
		
        this.makePayment = function(gateway) {
			
				_this.pageLoading=true;
				sessionService.set('payment','Paypal');
				var getAdmin = Product.getAdmin;
				var gA = new getAdmin();
				gA
					.$get({
						guest_token: sessionService.get("token")
					}, function(data) {
						if (data.status == "success") {
						  _this.padmin = data.response;
							
						
						
					   
						var getCart = Cart.getCart;
						var gC = new getCart();
						gC
							.$get({
								guest_token: sessionService.get("token")
							}, function(datas) {
								if (datas.status == "success") {
									
									if(gateway=='payPal'){
										
										var data = {
											cmd: "_cart",
											business: _this.padmin.payment_gateway[0].email,
											return: dpath+'success',
											notify_url: dpath+'payment/notify-order/' + sessionService.get('user_token'),
											upload: 1,
											currency_code: "USD",
											cancel_return: dpath+'cancel'
										};
										// item data
										var ctr = 1;
										if(sessionService.get('coupon'))
											data['discount_amount_cart']=sessionService.get('coupon_amount');
										
										datas.response.cart.forEach(function(product) {
											data["item_number_" + ctr] = product.product_id.sku;
											data["item_name_" + ctr] = product.product_id.title;
											data["quantity_" + ctr] = product.product_quantity;
											data["amount_" + ctr] = product.selected_pricing.after_discount.toFixed(2);
											if(product.product_id.paid_by_buyer==true)
											data["shipping_" + ctr] = product.product_id.shipping_details.fee.toFixed(2);
										
											ctr++;
										});
										var form = $('<form/></form>');
										form.attr("action", "https://www."+_this.padmin.payment_gateway[0].mode+".paypal.com/cgi-bin/webscr");
										form.attr("method", "POST");
										form.attr("style", "display:none;");
										_this.addFormFields(form, data);
										
										$("body").append(form);
										form.submit();
										form.remove();
									}
									else if(gateway=='Stripe'){
										
										
									}
								}
							});
						}    
				}, function(data) {
						if (data.status == "401") {
							sessionService.get("token");
						}
					})
			

            // submit form

        }
    }])