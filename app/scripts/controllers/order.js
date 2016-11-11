'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
    .controller('OrderCtrl', ['$routeParams', 'Order', 'Checkout', "$location", "sessionService", 'endpoint', "$scope", function($routeParams, Order, Checkout, $location, sessionService, endpoint, $scope) {
        var _this = this;
		_this.download_url=endpoint;
        var getOrder = Order.getOrder;
        var sO = new getOrder();
        sO
            .$get({
                guest_token: sessionService.get("token")
            }, function(data) {
				if (data.status == "success") {
                    _this.orders = data.response;

                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })
    }])