'use strict';

describe('Controller: RegisterctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('eCommerceUserApp'));

  var RegisterctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegisterctrlCtrl = $controller('RegisterctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RegisterctrlCtrl.awesomeThings.length).toBe(3);
  });
});
