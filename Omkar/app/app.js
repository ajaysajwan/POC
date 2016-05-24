
var app = angular.module('myApp', ['ui.router', 'googlechart']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    
//     ChartJsProvider.setOptions({
//      colours: ['#FF5252', '#FF8A80'],
//      responsive: true
//    });
//    // Configure all line charts
//    ChartJsProvider.setOptions('Line', {
//     // datasetFill: false
//    });
//    // Configure all bar charts
//     ChartJsProvider.setOptions('bar', {
//      //datasetFill: false,
//       
//    });
    
    
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        .state('home', {
            url: '/home',
            views: {

            // the main home template
            '': { templateUrl: 'app/home/home.html',
                  //controller: 'homeCtr'
                },

            // child views will be defined here (absolutely named)
//            'headerHome@home': { 
//                template: '<h1>Home Page</h1><span>Inside home</span>',
//                controller: 'homeHeaderCtr'
//            },

            // for column two, we'll define a separate controller 
            'footerHome@home': { 
                templateUrl: 'app/home/home-footer.html'
            }
        }
        })

        // ABOUT PAGE 
       .state('about', {
            url: '/about',
            templateUrl: 'app/about/about.html',
        
        })
    
     .state('about.footer', {
            url: '/footer',
            template: '<h4>Footer Content Shown</h4>'
        });
            
        
        // Configure all charts
    
        
     
}]);



