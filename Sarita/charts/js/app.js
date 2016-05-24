google.setOnLoadCallback(function () {
    angular.bootstrap(document.body, ['app']);
});
google.load('visualization', '1', {
    packages: ['corechart']
});
var app = angular.module('app', ['ngAnimate']);
app.controller('Ctrl',['$scope','$http', function ($scope,$http) {
	var chartdata = [];
	var chartd = [];
	var i = 0;
    $scope.chartTitle = "Sales per month";
    $scope.chartWidth = 500;
    $scope.chartHeight = 400;
	$http.get('js/data.json').success(function(response){
		$scope.data = response;
		for(i=0;i<$scope.data.length;i++){
			chartd.push([$scope.data[i].label,$scope.data[i].value1,$scope.data[i].value2,$scope.data[i].value3]);
			chartdata.push([{ c: [{ v: $scope.data[i].month},{v:$scope.data[i].value1},{v:$scope.data[i].value2},{v:$scope.data[i].value3}]}]);
		}
		$scope.chartData = chartdata;
		$scope.chartd = chartd;
	})
	
	
    $scope.deleteRow = function (index) {
        $scope.chartData.splice(index, 1);
    };
    $scope.addRow = function () {
        $scope.chartData.push([]);
    };
}]);