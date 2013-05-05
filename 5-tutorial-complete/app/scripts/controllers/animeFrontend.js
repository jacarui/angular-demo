'use strict';

angular.module('front2App')
  .controller('AnimeFrontendCtrl', function ($scope, animeFrontendSvc) {
    $scope.animes = animeFrontendSvc.query();
  });
