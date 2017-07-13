var myApp = angular.module("TodoApp", ["ngRoute", "ngResource"]).
    config(function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        $routeProvider.
            when('/', { controller: ListCtrl, templateUrl: 'list.html' }).
            when('/new', { controller: CreateCtrl, templateUrl: 'Details.html' }).
            when('/edit/:editId', { controller: EditCtrl, templateUrl: 'Details.html' }).
          otherwise({ redirectTo: '/' });
    });

myApp.factory('Todo', function ($resource) {
    return $resource('/api/todo/:id', { id: '@id' }, { update: { method: 'PUT' } });
});

var CreateCtrl = function ($scope, $location, Todo) {
    $scope.save = function () {
        Todo.save($scope.item, function () {
            $location.path('/');
        });
        $scope.action = "Add";
    };
};


var EditCtrl = function ($scope, $location, Todo, $routeParams) {

    var id = $routeParams.editId;
    $scope.item = Todo.get({ id: id });

    $scope.action = "Update";

    $scope.save = function () {

        Todo.update({ id: id }, $scope.item, function () {
            $location.path("/");
        });
    };
};
var ListCtrl = function ($scope, $location, Todo) {


    $scope.search = function () {

        $scope.loading = true;

        Todo.query({
            q: $scope.query,
            sort: $scope.sort_order,
            desc: $scope.is_desc,
            offset: $scope.offset,
            limit: $scope.limit
        },
            function (data) {
                $scope.more = data.length === 20;
                $scope.items = $scope.items.concat(data);
                $scope.loading = false;
            });
    };

    $scope.delete = function () {
        var id = this.item.TodoItemId;
        Todo.delete({ id: id }, function () {

            $('#todo_' + id).fadeOut();
        });
    };

    $scope.sort = function (col) {

        if ($scope.sort_order === col) {
            $scope.is_desc = !$scope.is_desc;
        }
        else {
            $scope.sort_order = col;
            $scope.is_desc = false;
        }

        $scope.reset();
    };

    $scope.showMore = function () {
        $scope.offset += $scope.limit;
        $scope.search();
    };

    $scope.hasMore = function () {
        return $scope.more;
    };


    $scope.reset = function () {
        $scope.limit = 20;
        $scope.offset = 0;
        $scope.items = [];
        $scope.more = true;
        $scope.search();
    };

    $scope.sort_order = "Priority";
    $scope.is_desc = false;


    $scope.reset();

};

//myApp.controller("ListCtrl", listCtrl);