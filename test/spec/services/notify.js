'use strict';

describe('Service: Notify', function () {

  // load the service's module
  beforeEach(module('eCommerceUserApp'));

  // instantiate service
  var Notify;
  beforeEach(inject(function (_Notify_) {
    Notify = _Notify_;
  }));

  it('should do something', function () {
    expect(!!Notify).toBe(true);
  });

});
