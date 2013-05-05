'use strict';

describe('Controller: AnimeFrontendCtrl end to end', function () {

  it('load the anime list', function() {
    browser().navigateTo('/web/#/animeFrontend');
    expect(repeater('.row').count()).toEqual(2);
  });


});