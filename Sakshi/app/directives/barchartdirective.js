'use strict';
(function main($angular, d3) {
    $angular.module('barChartDirective', [])
        .directive('barChart', ['$interval', function($interval) {

            return {

                restrict: 'E',

                scope: {
                    height: '=height',
                    data: '=data',
                    color: '=color'
                },

                template: '<h2>REGIONWISE REVENUE</h2>',


                link: function(scope, element, attrs) {

                    var chartEl = d3.select(element[0]);
                    var chart = d3.custom.barChart();

                    chart.height(scope.height);

                    scope.$watch('data', function(newVal) {
                        newVal.color = scope.color;
                        chartEl.datum(newVal).call(chart);
                    }, true);
                }
            }
        }])

})
(window.angular, window.d3);