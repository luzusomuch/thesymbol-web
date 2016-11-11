'use strict';

describe('Directive: loginheaderBar', function () {

  // load the directive's module
  beforeEach(module('eCommerceUserApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<loginheader-bar></loginheader-bar>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the loginheaderBar directive');
  }));
});
