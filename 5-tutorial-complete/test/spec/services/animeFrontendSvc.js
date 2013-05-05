'use strict';

describe('Service: animeFrontendSvc', function () {

  // load the service's module
  beforeEach(module('front2App'));

  // instantiate service
  var animeFrontendSvc;
  beforeEach(inject(function (_animeFrontendSvc_) {
    animeFrontendSvc = _animeFrontendSvc_;
  }));

  it('should do something', function () {
    expect(!!animeFrontendSvc).toBe(true);
  });

});
