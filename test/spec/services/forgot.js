'use strict';

describe('Service: Forgot', function () {

  // load the service's module
  beforeEach(module('eCommerceUserApp'));

  // instantiate service
  var Forgot;
  beforeEach(inject(function (_Forgot_) {
    Forgot = _Forgot_;
  }));

  it('should do something', function () {
    expect(!!Forgot).toBe(true);
  });

});
