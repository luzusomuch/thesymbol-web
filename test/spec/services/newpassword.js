'use strict';

describe('Service: newPassword', function () {

  // load the service's module
  beforeEach(module('eCommerceUserApp'));

  // instantiate service
  var newPassword;
  beforeEach(inject(function (_newPassword_) {
    newPassword = _newPassword_;
  }));

  it('should do something', function () {
    expect(!!newPassword).toBe(true);
  });

});
