'use strict';

describe('Controller: ResgiterctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('eCommerceUserApp'));

  var ResgiterctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResgiterctrlCtrl = $controller('ResgiterctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ResgiterctrlCtrl.awesomeThings.length).toBe(3);
  });
});
