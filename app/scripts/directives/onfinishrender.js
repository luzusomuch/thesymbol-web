'use strict';

/**
 * @ngdoc directive
 * @name eCommerceUserApp.directive:onFinishRender
 * @description
 * # onFinishRender
 */
angular.module('eCommerceUserApp')
  .directive('onFinishRender', function($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function() {
                        scope.$emit(attr.onFinishRender);
                    });
                }
            }
        }
    });