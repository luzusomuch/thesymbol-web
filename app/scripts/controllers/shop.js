'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:ShopCtrl
 * @description
 * # ShopCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
    .controller('ShopCtrl', ['$routeParams', 'Product', 'Category', "Cart", "$location", "sessionService", "$scope", function($routeParams, Product, Category, Cart, $location, sessionService, $scope) {

        var _this = this;


        this.close = function() {
            _this.error = '';
            _this.success = '';
        }

		_this.limit = 9;
		this.expand = function(limit) {
		  _this.limit += limit;
		}

        this.shopDetails = function() {
            var CProduct = new Product.shopProducts();
            CProduct
                .$get({
                    seller: $routeParams.sid,
					limit:9
                }, function(data) {
                    if (data.status == "success") {
                        _this.sellerp = data.response.product;
                        _this.seller = data.response.seller;
                        _this.length = data.response.product_count;
                    }
                }, function(data) {
                    if (data.status == "401") {
                        sessionService.get("token");
                    }
                })
        }
		this.shopDetailsPage = function(length) {
            var CProduct = new Product.shopProducts();
            CProduct
                .$get({
                    seller: $routeParams.sid,
					limit:length + 9,
					start: length
                }, function(data) {
                    if (data.status == "success") {
                        _this.sellerp= _this.sellerp.concat(data.response.product);
                    }
                }, function(data) {
                    if (data.status == "401") {
                        sessionService.get("token");
                    }
                })
        }


        

        if ($routeParams.sid != undefined)
            this.shopDetails();
		else
		{
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
		}


    }]);
