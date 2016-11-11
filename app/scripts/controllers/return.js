'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:ReturnCtrl
 * @description
 * # ReturnCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
    .controller('ReturnCtrl', ['$routeParams', 'Product', 'Category', "Cart", "$location", "sessionService", "$scope", function($routeParams, Product, Category, Cart, $location, sessionService, $scope) {

        var _this = this;

        this.close = function() {
            _this.error = '';
            _this.success = '';
        }

        var CProduct = new Product.detailsReturnProduct({ id: $routeParams.pid, oid: $routeParams.oid });
        CProduct
            .$get(function(data) {
                if (data.status == "success") {
                    _this.product = data.response.product;
                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })

        this.addToReturn = function() {
            var addReturn = new Product.addReturn(_this.return);
            addReturn
                .$get({
                    id: $routeParams.pid,
                    oid: $routeParams.oid
                }, function(data) {
                    if (data.status == "success") {
                        _this.success = data;
                    } else
                        _this.error = data;
                }, function(data) {
                    if (data.status == "401") {
                        sessionService.get("token");
                    }
                })
        }

    }]);