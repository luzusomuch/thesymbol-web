'use strict';

/**
 * @ngdoc directive
 * @name eCommerceUserApp.directive:logout
 * @description
 * # logout
 */
angular.module('eCommerceUserApp')
  .directive('logout', function () {
    return {
      template: '<li><a class="logout"  ng-click="LC.logout()">Logout</a></li>',
      restrict: 'E',
	  controller: 'LoginCtrl',
      controllerAs: 'LC',
      restrict: 'E'
    };
  });
