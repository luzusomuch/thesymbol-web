'use strict';

describe('Controller: ReturnCtrl', function () {

  // load the controller's module
  beforeEach(module('eCommerceUserApp'));

  var ReturnCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReturnCtrl = $controller('ReturnCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReturnCtrl.awesomeThings.length).toBe(3);
  });
});
