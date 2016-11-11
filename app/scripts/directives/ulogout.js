'use strict';

/**
 * @ngdoc directive
 * @name eCommerceUserApp.directive:ulogout
 * @description
 * # ulogout
 */
angular.module('eCommerceUserApp')
  .directive('ulogout', function () {
    return {
      template: '<a class="kp-button floatright" style="cursor:pointer;" ng-click="LC.logout()">Logout</a>',
	  controller: 'LoginCtrl',
      controllerAs: 'LC',
      restrict: 'E'
    };
  });
