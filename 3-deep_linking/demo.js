myApp = angular.module('demo', []);

myApp.config(function($routeProvider) {
    $routeProvider.
        when('/', {controller: ListCtrl, templateUrl: 'list.html'}).
        when('/edit/:id', {controller: EditCtrl, templateUrl: 'detail.html'}).
        when('/new', {controller: NewCtrl, templateUrl: 'detail.html'}).
        otherwise({redirectTo:'/'});
    });

myApp.factory('todos', function() {
    return [
        {id:1, text:'learn angular', done:true},
        {id:2, text:'build an angular app', done:false}
    ];
})

function ListCtrl($scope, todos) {
    $scope.todos = todos;

    $scope.addTodo = function() {
        todos.push({id:3, text:'lmao', done: false});
    }
}

function EditCtrl($scope, $routeParams, todos) {
    console.log($routeParams);

    $scope.todo = $scope.todos[$routeParams.id - 1];
}

function NewCtrl($scope) {

}