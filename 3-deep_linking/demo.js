angular.module('demo', []).
    config(function($routeProvider) {
        $routeProvider.
            when('/', {controller: ListCtrl, templateUrl: 'list.html'}).
            when('/edit/:id', {controller: EditCtrl, templateUrl: 'detail.html'}).
            when('/new', {controller: NewCtrl, templateUrl: 'detail.html'}).
            otherwise({redirectTo:'/'});
    });

function ListCtrl($scope) {
    $scope.todos = [
        {id:1, text:'learn angular', done:true},
        {id:2, text:'build an angular app', done:false}];

    $scope.addTodo = function() {
        $scope.todos.push(
            {id:3, text:'lmao', done: false}
        );
    }
}

function EditCtrl($scope, $routeParams) {
    console.log($routeParams);

    $scope.todos = [
        {id:1, text:'learn angular', done:true},
        {id:2, text:'build an angular app', done:false}];

    $scope.todo = $scope.todos[$routeParams.id - 1];
}

function NewCtrl($scope) {

}