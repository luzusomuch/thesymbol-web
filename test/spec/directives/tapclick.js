'use strict';

describe('Directive: tapclick', function () {

  // load the directive's module
  beforeEach(module('eCommerceUserApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<tapclick></tapclick>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the tapclick directive');
  }));
});
