'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:ShopCtrl
 * @description
 * # ShopCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
    .controller('ShopCtrl', ['$routeParams', 'Product', 'Category', "Cart", "$location", "sessionService", "$scope", '$http', 'endpoint', function($routeParams, Product, Category, Cart, $location, sessionService, $scope, $http, endpoint) {

        var _this = this;


        this.close = function() {
            _this.error = '';
            _this.success = '';
        }

		_this.limit = 9;
		this.expand = function(limit) {
		  _this.limit += limit;
		}

        this.primeProducts = [];
        this.getPrimeProducts = () => {
            var primesubscriptionData_url = endpoint + '/primesubscriptions';
            $http.get(primesubscriptionData_url).success(resp => {
              $scope.primesubscriptionData = resp.response[0];
            });

            var CProduct = new Product.shopProducts();
            CProduct.$get({limit: 10, seller: $routeParams.sid, primesubscription: true}, (resp) => {
                this.primeProducts = resp.response.product;
            }, (err) => {
                console.log(err);
            });
        }
        this.getPrimeProducts();

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


    }])
    .filter('productPrimeImageFilter', function() {
        return function(images) {
            let tmp = 'http://res.cloudinary.com/primefusion/image/upload/v1475749826/p2kb4zz0pi2zentrygnj.png';
            if (images && images.length > 0) {
                tmp = (images[0].cdn) ? images[0].cdn.url : tmp;
            }
            return tmp;
        }
    })
    .filter('productPrimeExtraPay', function() {
        return function(price, extra_pay) {
            if (extra_pay) {
                price += extra_pay;
            }
            console.log(price);
            return price;
        }
    });
