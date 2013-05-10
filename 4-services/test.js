myApp = angular.module('demo', []);

myApp.config(function($routeProvider) {
    $routeProvider.
        when('/', {controller: MovieCtrl,
            templateUrl: 'list.html'}).
        when('/movie/:id', {controller: EditCtrl,
            templateUrl: 'detail.html'});
    });

myApp.factory('movies', function() {
    return [
        {id:1, name:"la vaquilla"},
        {id:2, name:"star wars"},
        {id:3, name:"indiana jones"},
        {id:4, name:"matrix"}
    ];
});

function MovieCtrl($scope, movies) {
    $scope.movies = movies;

    $scope.addMovie = function() {
        movies.push({id:5, name:"star trek"});
    };
}

function EditCtrl($scope, $routeParams, movies) {
    $scope.selected = movies[$routeParams.id - 1];
}
