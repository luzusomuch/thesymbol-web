'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
    .controller('HeaderCtrl', ['$cookieStore', 'seller', 'Account', '$routeParams', 'Product', 'Category', 'search', 'Cart', "$location", "sessionService", "$scope", "$rootScope", function($cookieStore, seller, Account, $routeParams, Product, Category, search, Cart, $location, sessionService, $scope, $rootScope) {
        var _this = this;
        
		_this.sellerurl=seller;
		
        _this.user = sessionService.get('user');
		
        this.close = function() {
            _this.error = '';
            _this.success = '';
        }
		
		var getCategory = Category.getCategory;
			var gC = new getCategory();
			gC
            .$get(function(data) {
                if (data.status == "success") {
                    $scope.category = data.response.categories;
                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })
		
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
		
		if(sessionService.get('user')){
			var getDetails = Account.getDetails;
			var gD = new getDetails();
			gD
				.$get({
					guest_token: sessionService.get("token")
				}, function(data) {
					if(data.statusMessage=='Unauthorized')
						$location.path("/login");
					if (data.status == "success") {
						_this.cuser = data.response;
					}
				}, function(data) {
					if (data.status == "401") {
						sessionService.get("token");
					}
				})
		}
			
			
		_this.limit=9;
		this.expand = function(limit) { 
		  _this.limit += limit;
		}
		
		
			
			
		var getPage = Category.getPage;
        var gP = new getPage();
        gP
            .$get({
                guest_token: sessionService.get("token")
            }, function(data) {
                if (data.status == "success") {
                    _this.pages = data.response.pages;
                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })

        var getCart = Cart.getCart;
        var gC = new getCart();
        gC
            .$get({
                guest_token: sessionService.get("token")
            }, function(data) {
                if (data.status == "success") {
                    _this.carts = data.response.cart;
                    $scope.carts = data.response.cart;
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


        this.searchP = function() {
			sessionService.set('q',_this.srch.name);
			sessionService.destroy('lprice');
			sessionService.destroy('hprice');
			sessionService.destroy('cateid');
			
            $location.path("search").search({
                q: _this.srch.name
            });
        }

        this.searchPs = function() {
            var searchProduct = search.searchProduct;
            var Search = new searchProduct();
            Search.$get({
                name: $routeParams.q,
				limit:9
            },function(data) {
                if (data.status == "success") {
                    _this.products = data.response.product;
					_this.length = data.response.product_count;
					_this.search =$routeParams.q;
                } else {
                    _this.error = data;
                }
            });
        }
		
		
		this.pageSearch = function(length) {
			_this.pageLoading=true;
            var searchProduct = search.searchProduct;
            var Search = new searchProduct();
            Search.$get({
                name: sessionService.get('q'),
                lprice: sessionService.get('lprice'),
                hprice: sessionService.get('hprice'),
				limit: 9,
				start:length
            },function(data) {
                if (data.status == "success") {
					_this.pageLoading=false;
                    _this.products= _this.products.concat(data.response.product);
					_this.search =$routeParams.q;
                } else {
                    _this.error = data;
                }
            });
        }
		
		this.pageCateSearch =  function(length) {
			_this.pageLoading=true;
			var CProduct = new Product.cateProduct();
            CProduct
                .$get({
                category: sessionService.get('cateid'),
                lprice: sessionService.get('lprice'),
                hprice: sessionService.get('hprice'),
				limit: 9,
				start:length
            },function(data) {
                    if (data.status == "success") {
						_this.pageLoading=false;
                        _this.products.concat= data.response.product;
                        _this.cate = data.response.category;
						_this.search =_this.cate.name;
                    }
                }, function(data) {
                    if (data.status == "401") {
                        sessionService.get("token");
                    }
                })
        }
		
		

       
		this.getCategory = function() {
        var getCategory = Category.getCategory;
        var gC = new getCategory();
        gC
            .$get(function(data) {
                if (data.status == "success") {
                    _this.category = data.response.categories;
                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })
		}


        this.categorySearch = function() {
			sessionService.destroy('q');
			sessionService.destroy('lprice');
			sessionService.destroy('hprice');
			
            var CProduct = new Product.cateProduct();
            CProduct
                .$get({
                category: $routeParams.cid,
				limit:9
            },function(data) {
                    if (data.status == "success") {
                        _this.products = data.response.product;
                        _this.cate = data.response.category;
                        _this.length = data.response.product_count;
						_this.search =_this.cate.name;
						sessionService.set('cateid',_this.search);
                    }
                }, function(data) {
                    if (data.status == "401") {
                        sessionService.get("token");
                    }
                })
        }
		
		
				
        this.priceSearch = function() {
			sessionService.set('lprice',$('#minp').val());
			sessionService.set('hprice',$('#maxp').val());
            var searchPriceProduct = search.searchPriceProduct;
            var Search = new searchPriceProduct();
            Search.$get({
                name: $routeParams.q,
                category: $routeParams.id,
                lprice: $('#minp').val(),
                hprice: $('#maxp').val(),
				limit:9
            }, function(data) {
                if (data.status == "success") {
                    _this.products = data.response.product;
					_this.length=data.response.product_count;
					if(sessionService.get('q')){
						_this.qs = sessionService.get('q');
					_this.search = _this.qs + ", $"+$('#minp').val() +" -  $"+$('#maxp').val();
					}
					if(sessionService.get('cateid')){
						_this.qs = sessionService.get('cateid');
					_this.search = _this.qs +" , $"+$('#minp').val() +" -  $"+$('#maxp').val();
					}
                } else {
                    _this.error = data;
                }
            });
        }
		
		this.venderAll = function () {
			var shopList = new Product.shopList();
			shopList
				.$get(function(data) {
					if (data.status == "success") {
						_this.group = data.response;
					}
				}, function(data) {
					if (data.status == "401") {
						sessionService.get("token");
					}
				})
		}
		
		_this.colourIncludes = [];
    
		this.includeColour = function(colour) {
			var i = $.inArray(colour, _this.colourIncludes);
			if (i > -1) {
				_this.colourIncludes.splice(i, 1);
			} else {
				_this.colourIncludes.push(colour);
			}
		}
		
		this.colourFilter = function(fruit) {
			if (_this.colourIncludes.length > 0) {
				if ($.inArray(fruit.seller_name, _this.colourIncludes) < 0)
					return;
			}
			return fruit;
		}
		
		
		
        if ($routeParams.cid != undefined){
			this.venderAll();
            this.categorySearch();
			this.getCategory();
		}

        if ($routeParams.q != undefined){
			this.venderAll();
            this.searchPs();
			this.getCategory();
		}
		
					var Dropdownhover = function (element, options) {
						this.options    = options    
						this.$element   = $(element)

						var that = this

						// Defining if navigation tree or single dropdown
						this.dropdowns = this.$element.hasClass('dropdown-toggle') ? this.$element.parent().find('.dropdown-menu').parent('.dropdown') : this.$element.find('.dropdown')

						this.dropdowns.each(function(){
							$(this).on('mouseenter.bs.dropdownhover', function(e) {
							  that.show($(this).children('a, button'))
							})
						})
						this.dropdowns.each(function(){
							$(this).on('mouseleave.bs.dropdownhover', function(e) {
							  that.hide($(this).children('a, button'))
							})
						})

					  }

					  Dropdownhover.TRANSITION_DURATION = 300
					  Dropdownhover.DELAY = 150
					  Dropdownhover.TIMEOUT

					  Dropdownhover.DEFAULTS = {
						animations : ['fadeInDown', 'fadeInRight', 'fadeInUp', 'fadeInLeft'],
					  }

					  // Opens dropdown menu when mouse is over the trigger element
					  Dropdownhover.prototype.show = function (_dropdownLink) {


						var $this = $(_dropdownLink)

						window.clearTimeout(Dropdownhover.TIMEOUT)
						// Close all dropdowns
						$('.dropdown').not($this.parents()).each(function(){
							 $(this).removeClass('open');
						 });

						var effect = this.options.animations[0]

						if ($this.is('.disabled, :disabled')) return

						var $parent  = $this.parent()
						var isActive = $parent.hasClass('open')

						if (!isActive) {

						  var $dropdown = $this.next('.dropdown-menu')
						  var relatedTarget = { relatedTarget: this }

						  $parent
							.addClass('open')

						  var side = this.position($dropdown)
						  side == 'top' ? effect = this.options.animations[2] :
						  side == 'right' ? effect = this.options.animations[3] :
						  side == 'left' ? effect = this.options.animations[1] :
						  effect = this.options.animations[0]

						  $dropdown.addClass('animated ' + effect)

						  var transition = $.support.transition && $dropdown.hasClass('animated')

						  transition ?
							$dropdown
							  .one('bsTransitionEnd', function () {
								$dropdown.removeClass('animated ' + effect)
							  })
							  .emulateTransitionEnd(Dropdownhover.TRANSITION_DURATION) :
							$dropdown.removeClass('animated ' + effect)
						}

						return false
					  }

					  // Closes dropdown menu when moise is out of it
					  Dropdownhover.prototype.hide = function (_dropdownLink) {

						var that = this
						var $this = $(_dropdownLink)
						var $parent  = $this.parent()
						Dropdownhover.TIMEOUT = window.setTimeout(function () {
						  $parent.removeClass('open')
						}, Dropdownhover.DELAY)
					  }

					  // Calculating position of dropdown menu
					  Dropdownhover.prototype.position = function (dropdown) {

						var win = $(window);

						// Reset css to prevent incorrect position
						dropdown.css({ bottom: '', left: '', top: '', right: '' }).removeClass('dropdownhover-top')
					  
						var viewport = {
						  top : win.scrollTop(),
						  left : win.scrollLeft()
						};
						viewport.right = viewport.left + win.width();
						viewport.bottom = viewport.top + win.height();
						
						var bounds = dropdown.offset();
						  bounds.right = bounds.left + dropdown.outerWidth();
						  bounds.bottom = bounds.top + dropdown.outerHeight();
						var position = dropdown.position();
						  position.right = bounds.left + dropdown.outerWidth();
						  position.bottom = bounds.top + dropdown.outerHeight();
					  
						var side = ''
					   
						var isSubnow = dropdown.parents('.dropdown-menu').length

						if(isSubnow) {

						  if (position.left < 0) {
							side = 'left'
							dropdown.removeClass('dropdownhover-right').addClass('dropdownhover-left')
						  } else {
							side = 'right'
							dropdown.addClass('dropdownhover-right').removeClass('dropdownhover-left')
						  }

						  if (bounds.left < viewport.left) {
							side = 'right'
							dropdown.css({ left: '100%', right: 'auto' }).addClass('dropdownhover-right').removeClass('dropdownhover-left')
						  } else if (bounds.right > viewport.right) {
							side = 'left'
							dropdown.css({ left: 'auto', right: '100%' }).removeClass('dropdownhover-right').addClass('dropdownhover-left')
						  }

						  if (bounds.bottom > viewport.bottom) {
							dropdown.css({ bottom: 'auto', top: -(bounds.bottom-viewport.bottom) })
						  } else if (bounds.top < viewport.top) {
							dropdown.css({ bottom: -(viewport.top-bounds.top), top: 'auto' })
						  }

						} else { // Defines special position styles for root dropdown menu

						  var parentLi = dropdown.parent('.dropdown')
						  var pBounds = parentLi.offset()
							pBounds.right = pBounds.left + parentLi.outerWidth()
							pBounds.bottom = pBounds.top + parentLi.outerHeight()

						  if (bounds.right > viewport.right) {
							dropdown.css({ left: -(bounds.right-viewport.right), right: 'auto' })
						  }

						  if (bounds.bottom > viewport.bottom && (pBounds.top - viewport.top) > (viewport.bottom - pBounds.bottom) || dropdown.position().top < 0) {
							side = 'top'
							dropdown.css({ bottom: '100%', top: 'auto' }).addClass('dropdownhover-top').removeClass('dropdownhover-bottom')
						  } else {
							side = 'bottom'
							dropdown.addClass('dropdownhover-bottom')
						  }
						}

						return side;

					  }


					  // DROPDOWNHOVER PLUGIN DEFINITION
					  // ==========================

					  function Plugin(option) {
						return this.each(function () {
						  var $this = $(this)
						  var data  = $this.data('bs.dropdownhover')
						  var settings = $this.data()
						  if($this.data('animations') !== undefined && $this.data('animations') !== null)
							 settings.animations =  $.isArray(settings.animations) ? settings.animations : settings.animations.split(' ')

						  var options = $.extend({}, Dropdownhover.DEFAULTS, settings, typeof option == 'object' && option)

						  if (!data) $this.data('bs.dropdownhover', (data = new Dropdownhover(this, options)))

						})
					  }

					  var old = $.fn.dropdownhover

					  $.fn.dropdownhover             = Plugin
					  $.fn.dropdownhover.Constructor = Dropdownhover


					  // DROPDOWNHOVER NO CONFLICT
					  // ====================

					  $.fn.dropdownhover.noConflict = function () {
						$.fn.dropdownhover = old
						return this
					  }


					  // APPLY TO STANDARD DROPDOWNHOVER ELEMENTS
					  // ===================================

					  var resizeTimer;
					  $(document).ready(function () {
						if($(window).width() >= 768) { // Breakpoin plugin is activated (768px)
						  $('[data-hover="dropdown"]').each(function () {
							var $target = $(this)
							Plugin.call($target, $target.data())
						  })
						}
					  })
					  $(window).on('resize', function () {
						clearTimeout(resizeTimer);
						resizeTimer = setTimeout(function(){
						  if($(window).width() >= 768) // Breakpoin plugin is activated (768px)
							$('[data-hover="dropdown"]').each(function () {
							  var $target = $(this)
							  Plugin.call($target, $target.data())
							})
						  else  // Disabling and clearing plugin data if screen is less 768px
							$('[data-hover="dropdown"]').each(function () {
							  $(this).removeData('bs.dropdownhover')
							  if($(this).hasClass('dropdown-toggle'))
								$(this).parent('.dropdown').find('.dropdown').andSelf().off('mouseenter.bs.dropdownhover mouseleave.bs.dropdownhover')
							  else
								$(this).find('.dropdown').off('mouseenter.bs.dropdownhover mouseleave.bs.dropdownhover')
							})
						}, 200)
					  })
					  
					  
					  
		$scope.$on('ngRepeatImagePreview', function(ngRepeatFinishedEvent) {
				var imgDefer = document.getElementsByTagName('img');
				for (var i=0; i<imgDefer.length; i++) {
				if(imgDefer[i].getAttribute('title')) {
				imgDefer[i].setAttribute('src',imgDefer[i].getAttribute('title'));
				} } 
		});
		
		
		
       
        $scope.$on('ngRepeatFinisheds', function(ngRepeatFinishedEvent) {
			
            $("#slider-range").slider({
                range: true,
                min: 0,
                max: 10000,
                values: [0, 1000],
                slide: function(event, ui) {
                    $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
                    $("#minp").val(ui.values[0]);
                    $("#maxp").val(ui.values[1]);
                }
            });
            $("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));
            $("#minp").val($("#slider-range").slider("values", 0));
            $("#maxp").val($("#slider-range").slider("values", 1));
        });
		

    }])
	.filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                  //Also remove . and , so its gives a cleaner result.
                  if (value.charAt(lastspace-1) == '.' || value.charAt(lastspace-1) == ',') {
                    lastspace = lastspace - 1;
                  }
                  value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    })
	
	