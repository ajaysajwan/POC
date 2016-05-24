myApp.directive('pieChart', ['d3Test', 'nvTest', function(d3Test, nvTest) {
  return {
    scope: {
      pie: '=',
      showText: '=?',
      key: '@'
    },
    template: '<div ng-class=" { \'section-width\': showText }" id="pieGraph">' +
      
      '<span  ng-class=" { \'display-initial\': !showText, \'display-after\': showText}" class="cross-img"><img ng-click="showRevenue()" src="../assets/img/close-x.png"></span>' +
      
      '<svg></svg>' +
      
      '<span ng-class=" { \'display-initial\': !showText, \'display-after\': showText }" class="text-svg">Revenue per month for {{key}}</span>' +
      
      '</div>',
    link: function(scope, element) {
      var svg = element.find('#pieGraph svg'),
      chart2;
      scope.showText = false;
      function update() {
        d3.select("#pieGraph svg")
          .datum(scope.pie)
          .call(chart2);
      };
      
      scope.$watch(function() { return angular.toJson(scope.pie); }, function() {
        if (chart2) {
         update();
        }
      });
        
      scope.showRevenue=function() {
         d3.selectAll("#pieGraph svg").style({"display": "none"})
         scope.showText=false;
      }
      
      scope.$on('chartloaded', update);
  

     nv.addGraph(function() {
     chart2 = nv.models.pieChart()
        .x(function(d) { return d.label })
        .y(function(d) { return d.value })
        .showLegend(false)
        .showLabels(true)
        .labelType("percent")
    ;
  
    nv.utils.windowResize(function() {
          chart2.update()
        });

    scope.$emit('chartloaded');
    return chart2;
    });
      
    }
  }
}]);