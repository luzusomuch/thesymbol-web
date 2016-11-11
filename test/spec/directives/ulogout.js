'use strict';

describe('Directive: ulogout', function () {

  // load the directive's module
  beforeEach(module('eCommerceUserApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ulogout></ulogout>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ulogout directive');
  }));
});
