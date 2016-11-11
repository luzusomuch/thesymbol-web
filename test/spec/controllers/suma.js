'use strict';

describe('Controller: SumaCtrl', function () {

  // load the controller's module
  beforeEach(module('eCommerceUserApp'));

  var SumaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SumaCtrl = $controller('SumaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SumaCtrl.awesomeThings.length).toBe(3);
  });
});
