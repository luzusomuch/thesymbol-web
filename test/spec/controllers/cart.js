'use strict';

describe('Controller: CartctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('eCommerceUserApp'));

  var CartctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CartctrlCtrl = $controller('CartctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CartctrlCtrl.awesomeThings.length).toBe(3);
  });
});
