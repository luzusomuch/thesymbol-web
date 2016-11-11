'use strict';

/**
 * @ngdoc directive
 * @name eCommerceUserApp.directive:partials
 * @description
 * # partials
 */
angular.module('eCommerceUserApp')
  .directive('partials', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the partials directive');
      }
    };
  });
