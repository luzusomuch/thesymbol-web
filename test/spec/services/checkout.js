'use strict';

describe('Service: Checkout', function () {

  // load the service's module
  beforeEach(module('eCommerceUserApp'));

  // instantiate service
  var Checkout;
  beforeEach(inject(function (_Checkout_) {
    Checkout = _Checkout_;
  }));

  it('should do something', function () {
    expect(!!Checkout).toBe(true);
  });

});
