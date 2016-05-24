var myApp = angular.module('graphApp', ['ngRoute']);

myApp.config(['$routeProvider',
    function($routeProvider) {
    $routeProvider.
      when('/getGraphData', {
        templateUrl: 'app/views/graph.html',
        controller: 'graphController'
    }). when('/aboutNVD3', {
        templateUrl: 'app/views/NVD3.html',
        controller: 'graphController'
    }).
      otherwise({
        redirectTo: '/aboutNVD3'
      });
}]);