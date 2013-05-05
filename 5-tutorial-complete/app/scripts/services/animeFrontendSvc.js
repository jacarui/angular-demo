'use strict';

angular.module('front2App')
  .factory('animeFrontendSvc', function ($resource) {
    return $resource('http://localhost\\:2403/animefrontend');
  });
