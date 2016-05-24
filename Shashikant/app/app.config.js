/* app.config.js 
In this module we are define routing for dashboard using ngRoute.
*/
(function () {
    'use strict';
    angular.module('app.config',[
        'ngRoute'
    ])    
    .config(routeConfig);
    routeConfig.$inject = ['$routeProvider','$locationProvider'];

    function routeConfig($routeProvider,$locationProvider) {
        $routeProvider.when('/dashboard', {
                templateUrl: 'app/dashboard/dashboard.html',
                controller: 'DashboardCtrl',
                controllerAs: 'dashboardAs'
            })
            .otherwise({
                redirectTo: '/dashboard'
            });
        // use the HTML5 History API
//        $locationProvider.html5Mode(true);
    }
})();