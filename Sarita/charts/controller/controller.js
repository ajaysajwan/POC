// JavaScript Document
app.controller('Ctrl',['$scope','$http', function ($scope,$http) {
	var chartdata = [];
	var i = 0;
    $scope.chartTitle = "Sales per month";
    $scope.chartWidth = 800;
    $scope.chartHeight = 600;
	$http.get('js/data.json').success(function(response){
		$scope.data = response;
		for(i=0;i<response.length;i++){
			chartdata.push([$scope.data[i].label,$scope.data[i].value1]);
		}
		console.log(chartdata);
	})
	$scope.chartData = chartdata;
    $scope.deleteRow = function (index) {
        $scope.chartData.splice(index, 1);
    };
    $scope.addRow = function () {
        $scope.chartData.push([]);
    };
}]);