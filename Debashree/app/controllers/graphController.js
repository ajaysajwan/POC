myApp.controller('graphController', ['$scope', 'd3Test', 'nvTest', 'dataFetch', 'dropDownData', function(
  $scope, d3Test, nvTest, dataFetch, dropDownData) {
  $scope.data2 = [];
  $scope.data = [];
      
  //Fetch Graph Data
  $scope.getData = function() {
      $scope.initial = true;
      dataFetch.getAllHotels().then(function(resData) {
        $scope.res = resData.data;
        $scope.data = [];
        angular.forEach($scope.res, function(r) {
          angular.forEach($scope.selected_items, function(value) {
            if (value == r.key) {
              $scope.data.push(r);
            }
          });
        });
      }, function(error) {
        $scope.res = error;
      });
    }
  
  // CallBack on click of legend
  $scope.graphOnClick = function() {
      return function(chart) {
        chart.legend.dispatch.on('legendClick', function(event) {
          $scope.showText = true;
          event.color = event.color.replace(',60%)', ',30%)');
          d3.selectAll("#pieGraph svg").style({
            "display": "block"
          });
          $scope.data2 = event.revenue;
          $scope.name = event.key;
        });
        chart.legend.dispatch.on('legendMouseout', function(event) {
          event.color = event.color.replace(',30%)', ',60%)');
        });
      }
    }
  
  //Show Table 
  $scope.showTable = function() {
      $scope.showTableData = true;
    }
  
  //Fetch DropDown Options
  $scope.dropdownOptions = [];
  dropDownData.getDropDownOptions().then(function(resp) {
    $scope.dropdownOptions = resp.data;
  }, function(error) {
    $scope.dropdownOptions = error;
  });
  $scope.selected_items = [];
      
  //Chart Types
  $scope.chartType = ['lineChart', 'scatterChart', 'multiBarChart', 'stackedAreaChart',
    'multiBarHorizontalChart'
  ];
}]);