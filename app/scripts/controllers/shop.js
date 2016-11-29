'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:ShopCtrl
 * @description
 * # ShopCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
    .controller('ShopCtrl', ['$routeParams', 'Product', 'Category', "Cart", "$location", "sessionService", "$scope", '$http', 'endpoint', 'search', 'Rating', 'growl', '$anchorScroll', function($routeParams, Product, Category, Cart, $location, sessionService, $scope, $http, endpoint, search, Rating, growl, $anchorScroll) {

        var _this = this;
        this.$routeParams = $routeParams;
        this.categories = [];
        this.getCategories = function() {
            var CCategory = new Category.getCategory();
            CCategory.$get({}, function(resp) {
                if (resp.status==='success') {
                    _this.categories = resp.response.categories;
                }
            });
        };
        this.getCategories();

        this.close = function() {
            _this.error = '';
            _this.success = '';
        }

		_this.limit = 9;
		this.expand = function(limit) {
		  _this.limit += limit;
		}

        this.primeProducts = [];
        this.getPrimeProducts = function() {
            var primesubscriptionData_url = endpoint + '/primesubscriptions';
            $http.get(primesubscriptionData_url).success(function(resp) {
              $scope.primesubscriptionData = resp.response[0];
            });

            var CProduct = new Product.shopProducts();
            CProduct.$get({limit: 10, seller: $routeParams.sid, primesubscription: true}, function(resp) {
                _this.primeProducts = resp.response.product;
            }, function(err) {
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

        $scope.$watchGroup(['productName', 'shopC.category'], function(nv) {
            var productName = nv[0];
            var category = nv[1];
            if (productName || (category && category.length > 0)) {
                _this.searchData = {page: 1};
                _this.isSearch = true;
                _this.searchProduct(productName, category, $routeParams.sid);
            } else {
                _this.isSearch = false;
                _this.searchData = {page: 1};
            }
        }, true);

        this.searchData = {page: 1};
        this.searchProduct = function(productName, category, shopId, lat, lng) {
            search.searchProducts({
                productName: productName,
                category: category,
                shopId: shopId,
                page: _this.searchData.page,
                lat: lat,
                lng: lng
            }).then(function(resp) {
                if (resp.data.status==='success') {
                    _this.searchData.page++;
                    _this.searchData.totalItem = resp.data.response.totalItem;
                    _this.searchData.items = (_this.searchData.items) ? _this.searchData.items.concat(resp.data.response.items) : resp.data.response.items;
                } else {
                    alert('Error when fetching data');
                }
            });
        };

        this.addReview = function () {
            if (sessionService.get('user') && angular.fromJson(sessionService.get('user'))._id) {
                var CRating = new Rating.addReview({
                    user: angular.fromJson(sessionService.get('user'))._id,
                    seller: $routeParams.sid,
                    stars: $scope.stars,
                    comment: $scope.comment
                });
                
                CRating.$get(function(data) {
                    if (data.status == "success") {
                        _this.success = true;
                    }
                    if (data.status == "fail") {
                        $scope.header.pageLoading = false;
                        _this.error = data;
                    }
                }, function(data) {
                    if (data.status == "401") {
                        sessionService.get("token");
                    }
                });
            } else {
                growl.error('Please login');
            }
        }

        this.getReview = function () {
            var CRating = new Rating.getReview();

            CRating.$get({
                    guest_token: sessionService.get("token"),
                    seller: $routeParams.sid
                },function(data) {
                if (data.status == "success") {
                    _this.reviews = data.response.reviews;
                    // console.log(data.response.reviews);
                    var total = 0;
                    var count = 0;
                    Object.keys(data.response.reviews).map(function(objectKey, index) {
                        var value = data.response.reviews[objectKey];
                        total += value.stars;
                        count++;
                    });
                    _this.rating = total / count;
                    _this.reviewsLength = data.response.reviews.length;
                }
                if (data.status == "fail") {
                    $scope.header.pageLoading = false;
                    _this.error = data;
                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })
        }
        this.getReview();

        $scope.scrollTo = function(id) {
            $location.hash(id);
            $anchorScroll();
        }

    }])
    .filter('productPrimeImageFilter', function() {
        return function(images) {
            var tmp = 'http://res.cloudinary.com/primefusion/image/upload/v1475749826/p2kb4zz0pi2zentrygnj.png';
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
            return price;
        }
    });
