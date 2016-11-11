'use strict';

describe('Controller: ForgotctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('eCommerceUserApp'));

  var ForgotctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ForgotctrlCtrl = $controller('ForgotctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ForgotctrlCtrl.awesomeThings.length).toBe(3);
  });
});
