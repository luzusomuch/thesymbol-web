'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
    .controller('MainCtrl', ['Product', 'Category', 'search', 'Main', 'Cart', "$location", "sessionService", "$scope", "$sce", '$rootScope', 'growl', function(Product, Category, search, Main, Cart, $location, sessionService, $scope, $sce, $rootScope, growl) {

        var _this = this;

        
        var getHome = Main.getHomepage;
        var gH = new getHome();
        gH
            .$get(function(data) {
                if (data.status == "success") {
                    _this.home = data.response;
					
                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })

       var shopList = new Product.shopList();
        shopList
            .$get(function(data) {
                if (data.status == "success") {
                    _this.shops = data.response;
                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })
		
		var getAllProducts = new Product.getAllProducts();
        getAllProducts
            .$get({limit:9},function(data) {
                if (data.status == "success") {
                    $scope.allp = data.response;
                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })
			
			
		_this.limit=9;
		sessionService.set('lastlenght',0);
		this.expand = function(limit) { 
		  _this.limit += limit;
		}
		
		
		
		this.myPagingFunction = function(length) {
			
			if($scope.allp.product_count!=length)
			{
				if(length!=sessionService.get('lastlenght')){
					sessionService.set('lastlenght',length);
				$scope.header.pageLoading=true;
				var getAllProducts = new Product.getAllProducts();
				getAllProducts
				.$get({limit:9, start:length},function(data) {
					if (data.status == "success") {
						$scope.allp.product = $scope.allp.product.concat(data.response.product);
						$scope.header.pageLoading=false;
					}
				}, function(data) {
					if (data.status == "401") {
						sessionService.get("token");
					}
				})
				}
			}
		}

		$scope.getIframeSrc = function(src) {
			console.log(src);
			  return $sce.trustAsResourceUrl(src+"?rel=0&amp;controls=0&amp;showinfo=0?rel=0&autoplay=1");
		};
		
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
				})
		
        
		  $.stickysidebarscroll("#stores",{offset: {top: 90, bottom: 200}});
		   $.stickysidebarscroll("#trending",{offset: {top: 90, bottom: 200}});
		    $('[data-toggle="tooltip"]').tooltip();
    }])
	
