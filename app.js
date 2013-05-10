
myApp = angular.module('demo',[]);

myApp.config(function($routeProvider) {
    $routeProvider.
        when('/', {controller: ListCtrl, templateUrl: 'list.html'}).
        when('/:id', {controller: DetailCtrl, templateUrl: 'detail.html'}).
        otherwise({redirectTo:'/'});
});

myApp.factory('movies', function() {
    return [
        {id:1, name:"Star Wars"},
        {id:2, name:"Empire Strikes Back"},
        {id:3, name:"Star Wars 6"}
    ];
});

function ListCtrl($scope, movies) {
    $scope.movies = movies;

    $scope.addMovie = function() {
        movies.push({id:5, name:"Star Trek"});
    };
}

function DetailCtrl($scope, movies, $routeParams) {
    $scope.selected = movies[$routeParams.id - 1];
}