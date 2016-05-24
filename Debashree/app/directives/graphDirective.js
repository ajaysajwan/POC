myApp.directive('graphNv', ['d3Test', 'nvTest', '$interval', function(d3Test, nvTest, $interval) {
  return {
    restrict: 'E',
    scope: {
      data: '=',
      callback: '&',
      height: '@',
      chartType: '=',
      initial: '=?',
      showTable: '&',
      tableData: '=?'
    },
    template: '<select class="form-control chart-type-drop-down" selected="Select" ng-init="selectedChartType = chartType[2]" ng-model="selectedChartType" data-ng-change ="selectChart(selectedChartType)" ng-options="x for x in chartType"></select>' +
      
      '<div ng-class=" { \'display-initial\': !initial, \'display-after\': initial }" id="nvGraph"><svg class="section-width" ng-attr-height="{{height}}"></svg></div>'  +
   
      '<div ng-class=" { \'display-initial\': !initial, \'display-after\': initial }"><button type="button" ng-click="run =!run" class="btn btn-primary button-align random-data">Random Data</button></div>' +
   
      '<div ng-class=" { \'display-initial\': !initial, \'display-after\': initial }"><button type="button" ng-click="show()" class="btn btn-primary button-align">Show table</button></div>',
    
      link: function(scope, element, attrs) {
      var svg = element.find('#nvGraph svg'),
      chart;
      scope.tableData = false;
      scope.initial = false;
      scope.run = true;

      //Update Function to call Graph draw function
      var update = function() {
        d3.select('#nvGraph svg')
            .datum(scope.data)
            .transition()
            .duration(900)
            .call(chart);
      };
      //Show Table
          
      scope.show = function() {
        scope.showTable();
     }
      
     //Select the type of Chart
      scope.selectChart = function(value) {
        d3.selectAll("#nvGraph svg > *").remove();
        drawChart(value);
      }
      scope.selectChart(scope.selectedChartType);
          
      //Update Graph on Data Change
      scope.$watch(function() {
        return angular.toJson(scope.data);
      }, function() {
        if (chart) {
          update();
        }
      });
          
      //Random Data generation
      $interval(function() {
        if (!scope.run) return;
        angular.forEach(scope.data, function(res) {
        var last={}
         var last = res.values[res.values.length - 1];
         last.y =last.y + 2;
          if(res.values[res.values.length - 1]) {
                res.values[res.values.length - 1].y = res.values[res.values.length - 1].y + Math.floor((Math.random() * 3) + 1);
            }
        })
      },3000);
         
    /*   Math.floor((Math.random()*(3000)+500))4000  */ 
          
      scope.$on('chartloaded', update);
          
      //Draw Graph
      function drawChart(chartType) {
        nv.addGraph({
          generate: function() {
            chart = nv.models[chartType]()
                .showLegend(true)
                .showYAxis(true)
                .showXAxis(true);
              
            //Customize tooltip
            chart.tooltip.contentGenerator(function(d) {
              if (d.data) {
                return '<div><span class="hotel-data">Hotel Name:  </span>' + d.series[0].key +
                  '</div>' + '<span class="hotel-data">Bookings:</span>' + d.data.label +
                  '<span class="hotel-data">' + d.data.y.toFixed(2) + '</span>';
              } else {
                return '<div><span class="hotel-data">Hotel Name:</span>' + d.series[0].key +
                  '</div>' + '<div>' + '<span class="hotel-data">Hotel Venue:</span>' + d.series[0].veneu +
                  '</div>' + '<span class="hotel-data">Bookings:</span>' + (d.point.label || d.point.x) +
                  '<span class="hotel-data">' + d.point.y.toFixed(2) + '</span>' +
                  '<div> <span class="hotel-data">Image: </span>' + '<img src=' + d.series[0].imgLocation +
                  '>' + '</div>';
              }
            });
              
            //Disable legend Click Functionality
            chart.legend.updateState(false);
            
            // Display x -axis tick based on String Value   
            chart.xAxis.axisLabel('Month').tickValues([0, 1, 2, 3, 4]).tickFormat(
              function(d) {
                var label = scope.data[0].values[d].label;
                return label;
              });
              
            chart.yAxis.axisLabel('BOOKINGS').tickFormat(d3.format('.2f'));
            nv.utils.windowResize(function() {
              chart.update()
            });
              
            scope.$emit('chartloaded');
            return chart;
          },
          callback: attrs.callback === undefined ? null : scope.callback() //Callback function to implement onClick Functionality
        });
      };
    }
  }
}]);