/* dashboard.controller.js */
(function () {
    'use strict';
    angular.module('app.dashboard', ['app.config', 'tc.chartjs', 'app.directive', 'dashboard.factory','ui.bootstrap'])
        .controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['ChartFactory', '$log', '$interval'];
    function DashboardCtrl(ChartFactory, $log, $interval) {
        var vm = this;
        vm.type = '';
        vm.monthWiseData = '';
        vm.data = [];
        vm.dataPieChart = [];
        vm.currentY = '2016';
        vm.showAgeGroupChart = showAgeGroupChart;
        vm.selectedVal = "ageGroup2035";
        vm.profitAndLossOptions = {};
        /*
        *Age group drop down option
        */
        vm.ageGroupOption = [
            {
                'label': '20-35 Age Group',
                'value': 'ageGroup2035'
            },
            {
                'label': '35-50 Age Group',
                'value': 'ageGroup3550'
            },
            {
                'label': '50-70 Age Group',
                'value': 'ageGroup5070'
            }
        ];
        /*Default profit and loss chart options.
        * There are some property for show profit & Loss chart
        * width- width of canvas
        * height- height of canvas
        * increaseBy - number example-1+1 or 1+10
        * interval - color fill speed
        * fill - Value in % (min-0% and max-100%)
        * fillColor- Fill color code
        * borderColor - Border color code
        */
        vm.profitAndLossOptions = {
            width: 200,
            height: 30,
            increaseBy: 1,
            interval: 8
        };
        
        
        
        ChartFactory.getBookingDetails().then(function (response) {
            angular.forEach(response.data[0][vm.currentY][0], function (key, value) {                
                var color = Math.floor(Math.random() * 16777215).toString(16);
                color = (color == 'FFFFFF') ? '636363' : color;
                vm.data.push({
                    value: key.mTotalBooking,
                    label: value,
                    color: '#' + color,
                    //                    highlight: '#' + Math.floor(Math.random() * 16777210).toString(16)
                });
                vm.dataPieChart.push({
                    value: key.ageGroup[vm.selectedVal].totalBooking,
                    label: value,
                    color: '#' + color
                });
            });
        }, function (error) {
            $log.error(error);
        });
        vm.isOpen = false;
        vm.dataBarChart = {};
        /*
        *ChartClick function calls when user click on the polar area chart. It will display data in Barchart *container and show profit and loss as well.
        */
        vm.chartClick = function (data) {
            if(data.length){
                vm.labels = [];
                vm.dataArr = [];
                ChartFactory.getBookingDetails().then(function (response) {
                    if (!vm.isOpen) {
                        vm.isOpen = true;
                    }
                    var temp = response.data[0][vm.currentY][0][data[0].label];
                    angular.forEach(temp['ageGroup'], function (key, val) {
                        if (val == 'ageGroup2035') val = '20-30';
                        if (val == 'ageGroup3550') val = '35-50';
                        if (val == 'ageGroup5070') val = '50-70';
                        vm.labels.push(val);
                        vm.dataArr.push(key.totalBooking);
                    });
                    vm.profitAndLossOptions.fill = temp.profit;
                    vm.profitAndLossOptions.fillColor = data[0].fillColor;
                    vm.profitAndLossOptions.borderColor = '#ddd';

                    vm.dataBarChart.labels = vm.labels;
                    vm.dataBarChart.datasets[0].data = vm.dataArr;
                    vm.dataBarChart.datasets[0].fillColor = data[0].fillColor;
                    vm.dataBarChart.datasets[0].highlightFill = data[0].highlightColor;
                    vm.dataBarChart.datasets[0].label = ' '+data[0].label+' ';                    
                }, function (error) {
                    $log.error(error);
                });
            }
        }
        /*
        *Option for polar area chart
        */
        vm.options = {
            tooltipTemplate: "<%=label%> : <%=value%>",
            
            //String - A legend template
            legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%> - <%=segments[i].value%><%}%></li><%}%></ul>'
        };
        /*
        *Option for bar chart legend and tooltip 
        */
        vm.barOptions = {
            tooltipTemplate: "<%=value%>",
            //String - A legend template
            legendTemplate: '<div class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%>'+vm.currentY +' <span style="background-color:<%=datasets[i].fillColor%>;color:#fff"><b> &nbsp;<%if(datasets[i].label){%><%=datasets[i].label %><%}%><%}%> &nbsp;</b></span> month age-group wise data distribution</div>'
        };
        /*
        *Data object for bar chart  
        */
        vm.dataBarChart = {
            labels: [],
            datasets: [
                {
                    label: '',
                    fillColor: '',
                    highlightFill: '',
                    highlightStroke: '',
                    data: []
                }
            ]
        };

        /*
        *Option for pie chart legend and tooltip 
        */
        vm.pieChartOptions = {
            tooltipTemplate: "No Of User : <%=value%>",
            //String - A legend template
            legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
        };


        /*
        *ShowAgeGroupChart function calls when the user selects an option from dropdown. It will display data in *a pie chart.
        */
        function showAgeGroupChart(selectedVal) {
            vm.dataPieChart = [];
            if(selectedVal){
                ChartFactory.getBookingDetails().then(function (response) {
                    angular.forEach(response.data[0][vm.currentY][0], function (key, value) {
                        var color = Math.floor(Math.random() * 16777215).toString(16);
                        color = (color == 'FFFFFF') ? '636363' : color;
                        vm.dataPieChart.push({
                            value: key.ageGroup[selectedVal].totalBooking,
                            label: value,
                            color: '#' + color
                        });
                    });
                }, function (error) {
                    $log.error(error);
                });
            }
        }
        /*
        *slideClose function calls when user click on the close icon on Barchart container for closing slide.
        */
        vm.slideClose = function () {
            vm.isOpen = false;
        }
        vm.isFlip =false;
        vm.flip = function(){
            vm.isFlip = vm.isFlip ? false : true;
        }
        
        
        /*
        *UpdateData function calls when user click on the Update button on the polar area chart container. It *will update the data and change dynamic color also. Example- oldval+ 10
        */
        vm.updateData = function(){            
            vm.data[0].value = vm.data[0].value+10;
            vm.data[1].value = vm.data[1].value+10;
            vm.data[2].value = vm.data[2].value+10;
            vm.data[3].value = vm.data[3].value+10;
            
            vm.data[0].color = '#' + Math.floor(Math.random() * 16777215).toString(16);
            vm.data[1].color = '#' + Math.floor(Math.random() * 16777115).toString(16);
            vm.data[2].color = '#' + Math.floor(Math.random() * 16777815).toString(16);
            vm.data[3].color = '#' + Math.floor(Math.random() * 16777715).toString(16);
        }
    }
})();
