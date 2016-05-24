var mainApp = angular.module('mainApp', ['ui.router']);
mainApp.config(function($stateProvider, $urlRouterProvider) {

    
    $stateProvider
		.state('reports', {
            url: '/reports',
            templateUrl: 'charts/partials/reports.html'
        }) 
		.state('home', {
            url: '/home',
            templateUrl: 'charts/partials/home.html'
        })  
    $urlRouterProvider.otherwise('/home');    		
});

