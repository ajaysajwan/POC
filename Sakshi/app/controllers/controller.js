'use strict';
(function main($angular) {

    $angular.module('donutApp', ['donutDirective', 'barChartDirective', 'gaugeDirective']).controller('DonutController', ['$scope', '$interval', '$timeout', 'DonutService', function DonutController($scope, $interval, $timeout, DonutService) {

        $scope.selectedModel = [];
        $scope.showModel = false;
        $scope.selectedColor = 0;
        //gauge initial value set to be 0
        $scope.demoValue = 0;
        //set gauge height and width options
        $scope.options = {
            width: 500,
            height: 300
        };
        //set barChart model data
        $scope.barChartData = [];
        
        //getting donut data from service
        $scope.setValues = function setValues() {
            
            DonutService.getDonutModel()
                .then(function(resp) {
                    $scope.donutModel = resp.data;
                    angular.forEach($scope.donutModel, function(source){
                        source.revenue = 0;
                        source.bookings = 0;
                        angular.forEach(source.Region, function(Region){
                            source.revenue = source.revenue + Region.revenue;
                            source.bookings = source.bookings + Region.bookings;
                        });      
                });
            });
        };
        
        //set an interval on updation of values on click of live data
        $scope.run = false;
         $interval(function() {
             if (!$scope.run) return;
             angular.forEach($scope.donutModel, function(source){
                 source.revenue = 0;
                 source.bookings = 0;
                 angular.forEach(source.Region, function(Region){
                     Region.revenue = Math.floor(Region.revenue * (1 + (Math.random()/ 10)));
                     source.revenue = source.revenue + Region.revenue;
                     Region.bookings = Math.floor(Region.bookings * (1 + (Math.random()/ 50)));
                     source.bookings = source.bookings + Region.bookings;
                 });   
                 $scope.demoValue = source.bookings;
             }) 
         },2000);
                         
                         
         
        //set the selected model on click of donut chart selections for other charts
        $scope.onClickSetModel = function onClickSetModel(model) {
            $scope.selectedModel = model;
            if ($scope.selectedModel) {
                $scope.barChartData = $scope.selectedModel.Region;
                $scope.demoValue = $scope.selectedModel.bookings;
                $scope.selectedColor = $scope.selectedModel.color;
                $scope.showModel = true;
            } else {
                $scope.showModel = false;
            }
        };

        //dount model property
        $scope.donutModel = [];

        $timeout(function timeout() {

            // Initialise after a second to simulate an AJAX request.
            $scope.setValues();

        }, 1000);

        //setting the donut colors from controller
        // $scope.donutColours = ['red', 'green', 'blue', 'yellow', 'orange'];

    }])

})(window.angular);