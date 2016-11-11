'use strict';

/**
 * @ngdoc function
 * @name eCommerceUserApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the eCommerceUserApp
 */
angular.module('eCommerceUserApp')
   .controller('AboutCtrl', ['$cookieStore', '$routeParams', 'Product', 'Category', 'search', 'Cart', "$location", "sessionService", "$scope", "$rootScope", function($cookieStore, $routeParams, Product, Category, search, Cart, $location, sessionService, $scope, $rootScope) {
     
	 var  _this=this;
	  
    var getPage = Category.getPage;
        var gP = new getPage({
                id: $routeParams.pageid
            });
        gP
            .$get(function(data) {
                if (data.status == "success") {
                    _this.page = data.response.page;
                }
            }, function(data) {
                if (data.status == "401") {
                    sessionService.get("token");
                }
            })
  }]);
