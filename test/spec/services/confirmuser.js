'use strict';

describe('Service: ConfirmUser', function () {

  // load the service's module
  beforeEach(module('eCommerceUserApp'));

  // instantiate service
  var ConfirmUser;
  beforeEach(inject(function (_ConfirmUser_) {
    ConfirmUser = _ConfirmUser_;
  }));

  it('should do something', function () {
    expect(!!ConfirmUser).toBe(true);
  });

});
