/*-Controller for home page-*/

/*--Angular Google Chart--*/
app.controller("ChartCtrl", ['$scope', 'chartData', 'googleChartApiPromise', function($scope, chartData, googleChartApiPromise) {

        $scope.chart1 = {};
 
    chartData.getChartData().then(function(data){
        // success function of then
        var data =data.data;
        // Setup Chart rows
        var chartRows = [];
           
        
        for (var i = 0, l = data.length; i < l; i++) {
            
            chartRows.push({
                c: [{
                    v: data[i].month
                }, {
                    v: data[i].america.total
                }, {
                    v: data[i].europe.total
                }, {
                    v: data[i].asia.total
                }, {
                    v: data[i].africa.total
                }, {
                    v: data[i].oceania.total
                }]
            });
            
            
        }
        // Setup Chart Columns
        var chartColumns = [{
            id: "month",
            label: "Month",
            type: "string"
        }, {
            id: "am-id",
            label: "america",
            type: "number"
        }, {
            id: "eu-id",
            label: "europe",
            type: "number"
        }, {
            id: "asia-id",
            label: "asia",
            type: "number"
        }, {
            id: "af-id",
            label: "africa",
            type: "number"
        }, {
            id: "oc-id",
            label: "oceania",
            type: "number"
        }];


 /*---Code for Multiple charts for same data : (Chart 1) ---*/
        var chart1 = {};
        chart1.type = "AreaChart";
        chart1.cssStyle = "height:300px; width:100%;";
        //used chart.data that I have show in above script
        chart1.data = {
            "cols": chartColumns,
            "rows": chartRows
        };
        chart1.options = {
            "title": "Website Visitors per month",
            "isStacked": "true",
            'colors': ['#003E5D', '#05643C', '#009D5A', '#7ECFA3', '#C7F465'],
            "fill": 2,
            "displayExactValues": true,
            'animation': {
                'duration': 1000,
                'easing': 'out',
                'startup': true
            },
            "vAxis": {
                "title": "Visitors Count",
                "gridlines": {
                    "count": 6
                }
            },
            "hAxis": {
                "title": "Month"
            }
        };
        chart1.formatters = {};
        $scope.chart1 = chart1;
        
         /*Function for chart 1*/
        $scope.change = function(type) {
            $scope.chart1.type = type;
            // AxisTransform()
        };

/*---Code for Column Chart with Filter: (Chart 2)---*/

        // set filter options
        $scope.selectOptions = [];
        for (i = 1; i < chartColumns.length; i++) {
            $scope.selectOptions[0] = 'all';
            $scope.selectOptions.push(chartColumns[i].label);
        }
        
        // Setup chart
        var chart2 = {};
        chart2.type = "ColumnChart";
        chart2.cssStyle = "height:300px; width:100%;";
        //used chart.data that I have show in above script
        chart2.data = {
            "cols": chartColumns,
            "rows": chartRows
        };
        chart2.options = {
            "title": "Website Visitors per month",
            "isStacked": "true",
            'colors': ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
            "fill": 2,
            "displayExactValues": true,
            'animation': {
                'duration': 1000,
                'easing': 'out',
                'startup': true
            },
            "vAxis": {
                "title": "Visit Count",
                "gridlines": {
                    "count": 4
                }
            },
            "hAxis": {
                "title": "Date"
            }
        };
        chart2.formatters = {};
        $scope.chart2 = chart2;

        // code for on change function of region filter
        $scope.filterFun = function() {
            var tempRows = [];
            var tempColumns = [];
            var tempAll = 'all';
            console.log($scope.myValue);
            if ($scope.myValue == tempAll) {
                chart2.data = {
                    "cols": chartColumns,
                    "rows": chartRows
                };

            } else if ($scope.myValue != tempAll && $scope.myValue != null) {
                console.log("in IF:");
                tempColumns = [{
                    id: "month",
                    label: "Month",
                    type: "string"
                }, {
                    id: $scope.myValue + "-id",
                    label: $scope.myValue,
                    type: "number"
                }];
                tempRows = [];

                angular.forEach(data, function(value, key) {
                    tempRows.push({
                        c: [{
                            v: data[key].month
                        }, {
                            v: data[key][$scope.myValue].total
                        }]
                    });
                });
                chart2.data = {
                    "cols": tempColumns,
                    "rows": tempRows
                };
            }



        };



 /*---Code for Geo Chart with Filter : (Chart 3)---*/
        
        //setup filter option
        $scope.mapFilterOptions = [];
        $scope.mapRegionOptions = [];
        for (i = 0; i < data.length; i++) {
            $scope.filterMonth = $scope.mapFilterOptions[0];
            $scope.mapFilterOptions.push(data[i].month);
        }
    

        for (i = 1; i < chartColumns.length; i++) {
            $scope.mapRegionOptions[0] = 'all';
            $scope.mapRegionFilter = $scope.mapRegionOptions[0];
            $scope.mapRegionOptions.push(chartColumns[i].label);
        }
        
        // setup data
        var dataMap = [];
        var monthIndex = $scope.mapFilterOptions.indexOf($scope.filterMonth);
        dataMap.push(['Region Code', 'Continent', 'Popularity'], ['142', 'Asia', data[monthIndex].asia.total], ['150', 'Europe', data[monthIndex].europe.total], ['019', 'Americas', data[monthIndex].america.total], ['009', 'Oceania', data[monthIndex].oceania.total], ['002', 'Africa', data[monthIndex].africa.total]

        );

        // setup chart
        var chart3 = {};
        chart3.type = "GeoChart";
        chart3.cssStyle = "height:300px; width:100%;";
        //used chart.data that I have show in above script
        chart3.data = dataMap;
        chart3.options = {
            title: "Website Visitors for January",
            region: 'world',
            resolution: 'continents',
            colorAxis: {
                colors: ['#aec7e8', '#003366']
            },
            dataMode: 'regions',

        };

        chart3.formatters = {};
        $scope.chart3 = chart3;

        // Code for on change function of month filter for geochart
        $scope.filterMonthFun = function() {
            monthIndex = $scope.mapFilterOptions.indexOf($scope.filterMonth);

            dataMap = [
                ['Region Code', 'Continent', 'Popularity'],
                ['142', 'Asia', data[monthIndex].asia.total],
                ['150', 'Europe', data[monthIndex].europe.total],
                ['019', 'Americas', data[monthIndex].america.total],
                ['009', 'Oceania', data[monthIndex].oceania.total],
                ['002', 'Africa', data[monthIndex].africa.total]
            ];
            chart3.data = dataMap;
            console.log(dataMap);
        }
 


 /*---Code for Pie chart with extended filters: (Chart 4) ---*/

        //set up filter options
        $scope.pieFilterOptions = [];
        $scope.pieRegionOptions = [];

        for (i = 0; i < data.length; i++) {
            $scope.pieMonthFilter = $scope.pieFilterOptions[0];
            $scope.pieFilterOptions.push(data[i].month);
        }

        for (i = 1; i < chartColumns.length; i++) {
            $scope.pieRegionFilter = $scope.pieRegionOptions[0];
            $scope.pieRegionOptions.push(chartColumns[i].label);
        }
        // Populate the default data 
        $scope.piemonthIndex = $scope.pieFilterOptions.indexOf($scope.pieMonthFilter);
        var tempSubRegion = [];
        for (var item in data[$scope.piemonthIndex][$scope.pieRegionFilter]) {
            tempSubRegion.push(item);
        }
        var tempVari = [];
        tempVari = Object.keys(data[$scope.piemonthIndex][$scope.pieRegionFilter]).length;
        var pieRows = [];
        for (i = 1; i < tempVari; i++) {

            var tempAccVar = tempSubRegion[i];
            //console.log("'"+tempAccVar+"'");
            pieRows.push({
                c: [{
                    v: tempSubRegion[i]
                }, {
                    v: data[$scope.piemonthIndex][$scope.pieRegionFilter][tempAccVar]
                }]
            });
        }



        var pieColumns = [{
            id: "continent",
            label: "continent",
            type: "string"
        }, {
            id: "Count",
            label: "Count",
            type: "number"
        }];
        
        
        // Setup chart
        var chart4 = {};
        chart4.type = "PieChart";
        chart4.cssStyle = "height:300px; width:100%;";
        //used chart.data that I have show in above script
        chart4.data = {
            "cols": pieColumns,
            "rows": pieRows
        };
        chart4.options = {
            //"title": "Website Visitors from Asia for the month January",
            "isStacked": "true",
            'colors': ['#000', '#222', '#444', '#666', '#888', '#aaa', '#ccc'],
            "fill": 2,
            "displayExactValues": true,
            //'legend': 'none',
            'pieHole': 0.4,
            'animation': {
                'duration': 1000,
                'easing': 'out',
                'startup': true
            },
            "vAxis": {
                "title": "Visitors Count",
                "gridlines": {
                    "count": 6
                }
            },
            "hAxis": {
                "title": "Month"
            }
        };

        chart4.formatters = {};
        $scope.chart4 = chart4;

        //on change function for filters
        $scope.pieFilterFun = function() {

            $scope.piemonthIndex = $scope.pieFilterOptions.indexOf($scope.pieMonthFilter);
            var tempSubRegion = [];
            for (var item in data[$scope.piemonthIndex][$scope.pieRegionFilter]) {
                tempSubRegion.push(item);
            }
            var tempVari = [];
            tempVari = Object.keys(data[$scope.piemonthIndex][$scope.pieRegionFilter]).length;
            var tempPieRows = [];
            var tempPieColumns = pieColumns;

            for (i = 1; i < tempVari; i++) {

                var tempAccVar = tempSubRegion[i];
                //console.log("'"+tempAccVar+"'");
                tempPieRows.push({
                    c: [{
                        v: tempSubRegion[i]
                    }, {
                        v: data[$scope.piemonthIndex][$scope.pieRegionFilter][tempAccVar]
                    }]
                });
            }

            chart4.data = {
                "cols": tempPieColumns,
                "rows": tempPieRows
            };
        };
    },function(error){
         // Error function of then
       console.log("Some Error" + error)
        
    });

}]);