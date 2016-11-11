'use strict';

describe('Service: Suma', function () {

  // load the service's module
  beforeEach(module('eCommerceUserApp'));

  // instantiate service
  var Suma;
  beforeEach(inject(function (_Suma_) {
    Suma = _Suma_;
  }));

  it('should do something', function () {
    expect(!!Suma).toBe(true);
  });

});
