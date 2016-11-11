'use strict';

/**
 * @ngdoc directive
 * @name eCommerceUserApp.directive:loginheaderBar
 * @description
 * # loginheaderBar
 */
angular.module('eCommerceUserApp')
  .directive('loginheaderBar', function () {
    return {
      templateUrl: 'partials/loginheaderbar.html',
      restrict: 'E'
      };
  });
