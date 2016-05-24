/*
* chart.directive.js
* List of directive-
* 1. canvasRect directive- This is an attribute directive. Which will create charts for profit and loss using canvas. OnMouseOver on the chart, it will display the tooltip.
* There are some property for show profit & Loss chart
* width- width of canvas
* height- height of canvas
* increaseBy - At a time % fill on box. Example- 1+1 or 1+10 
* interval - color fill speed in millisecond
* fill - % Fill color by in rectangle box
* fillColor- Fill color code
* borderColor - Border color code     

* 2. downloadChartImage directive- This is an element directive. Which will download the image of canvas content.
*/
(function () {
    'use strict';
    angular.module('app.chart', [])

    .directive('canvasRect', canvasRect)
    .directive('downloadChartImage', downloadChartImage);
    
    canvasRect.$inject = ['$interval'];

    function canvasRect($interval) {
        return {
            restrict: 'A', 
            scope: {
                options: '='
            }, 
            link: link
        };

        function link($scope, $elem, $attrs) {
            var canvas = document.getElementById("myCanvas"),
            context = canvas.getContext('2d'),
            
            tipCanvas = document.getElementById("tip"),
            tipCtx = tipCanvas.getContext("2d");


            var amount = 0;
            var amountToFill = $scope.options.fill;

            $scope.$watch('options', function (value) {
                clear();
                amount = 0;
                amountToFill = value.fill;
                draw();
            }, true);
            /*
             * clear() - clear created canvas
             */
            var clear = function () {
                    context.clearRect(5, 5, $scope.options.width, $scope.options.height);
                }
                /*
                 * draw() - draw canvas
                 */
            var draw = function () {
                context.save();
                context.beginPath();
                context.rect(5, 5, $scope.options.width, $scope.options.height);


                var grd = context.createLinearGradient(0, 0, 170, 0);
                grd.addColorStop(0, '#ffffff');
                grd.addColorStop(1, $scope.options.fillColor);


                context.fillStyle = grd;
                context.fillRect(5, 5, (($scope.options.width * amount) / 100), $scope.options.height);
                context.lineWidth = 1;
                context.strokeStyle = $scope.options.borderColor;
                context.stroke();
                amount = amount + $scope.options.increaseBy;
                context.fillStyle = '#777778';
                context.textAlign = "center";
                context.clearRect(10, 40, $scope.options.width, $scope.options.height + 20);
                context.fillText(amount + " %", $scope.options.width / 2, $scope.options.height + 20);
            }

            canvas.addEventListener("mouseover", function (e) {
                var template = 'Profit : ' + amount + '% & Loss : ' + (100 - amount) + '%';
                tipCanvas.style.display = "block";
                tipCtx.fillStyle = '#555';
                tipCtx.fillRect(0, 0, 200, 25);
                tipCtx.fillStyle = '#fff';
                tipCtx.font = "12px Arial";
                tipCtx.textAlign = "center";
                tipCtx.fillText(template, 80, 18);
            });
            canvas.addEventListener("mouseout", function () {
                tipCanvas.style.display = "none";
            });

            $interval(function () {
                if (amount < amountToFill) {
                    clear();
                    draw();
                }
            }, $scope.options.interval);
        }
    }
    function downloadChartImage() {
        return {
            restrict: 'E',
            replace : true, 
            template: '<a href="#" ng-click="_download()" id="{{ chartId }}_download" alt="Download as image" tooltip-placement="left" uib-tooltip="Download image"><span class="glyphicon glyphicon-download" aria-hidden="true"></span></a>', 
            scope: {
                chartId: '@', 
                imageName: '@'
            }, 
            link: link
        };

        function link($scope, $elem, $attrs) { 
            $scope._download = function(){ 
                $elem[0].href = document.getElementById($scope.chartId).toDataURL();
                $elem[0].download = $scope.imageName;
            }
        }
    }

})();