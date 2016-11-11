'use strict';

/**
 * @ngdoc directive
 * @name eCommerceUserApp.directive:headerBar
 * @description
 * # headerBar
 */
angular.module('eCommerceUserApp')
  .directive('headerBar', function () {
    return {
      templateUrl: 'partials/headerbar.html',
      controller: 'HeaderCtrl',
      controllerAs: 'header',
      restrict: 'E'
      };
  });
