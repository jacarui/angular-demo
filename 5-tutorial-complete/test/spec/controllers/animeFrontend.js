'use strict';

describe('Controller: AnimeFrontendCtrl', function () {

  // load the controller's module
  beforeEach(module('front2App'));

  var AnimeFrontendCtrl,
    scope;

  var httpMock;
  beforeEach(inject(function ($httpBackend) {
    httpMock = $httpBackend;
    $httpBackend.expectGET('http://localhost:2403/animefrontend').
      respond([{ title: "title1" },{ title: "title2"}]);    
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AnimeFrontendCtrl = $controller('AnimeFrontendCtrl', {
      $scope: scope
    });
  }));

  it('should request the anime list', function () {
    httpMock.flush();
    expect(scope.animes.length).toBe(2);
  });
});
