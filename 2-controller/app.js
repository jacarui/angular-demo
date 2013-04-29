function TodoCtrl($scope) {

    $scope.todos = [
        {text:'learn angular', done:true},
        {text:'build an angular app', done:false}];

    $scope.addTodo = function() {
        $scope.todos.push(
            {text:'lmao', done: false}
        );
    }
}