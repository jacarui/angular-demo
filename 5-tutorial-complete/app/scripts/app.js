'use strict';

angular.module('front2App', ['ngResource'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/animeFrontend', {
        templateUrl: 'views/animeFrontend.html',
        controller: 'AnimeFrontendCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
