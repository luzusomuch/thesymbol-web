'use strict';

/**
 * @ngdoc directive
 * @name eCommerceUserApp.directive:footerBar
 * @description
 * # footerBar
 */
angular.module('eCommerceUserApp')
  .directive('footerBar', function () {
    return {
      templateUrl: 'partials/footerbar.html',
      restrict: 'E'
    };
  });
