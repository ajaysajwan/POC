mainApp.controller('mainController',['$scope','$http','chartFactory',function($scope,$http,chartFactory){

	$scope.sellerOptions = ['ALL','MSFT','AMZN'];
	$scope.selectedSeller = $scope.sellerOptions[0]; //This sets the default value of the select in the ui 
//	$scope.colors = {'AMZN':'#BCD862','MSFT':'#A1C0CA'};
//	$scope.opacity = {'AMZN':1,'MSFT':0.5};
    $scope.settings = {
        height : 250,
        m : [20, 20, 30, 20],
        delay: 200,
        duration: 200,
        opacity: {'AMZN':1,'MSFT':0.5},
        colors : {'AMZN':'#BCD862','MSFT':'#A1C0CA'}
    }
	/** call back function for ajax response **/
	$scope.chartSuccess = function(resData){            
		var data = resData; 
		$scope.data = data;
		var parse = d3.time.format("%b %Y").parse;
		
		// Nest stock values by symbol.
		symbols = d3.nest()
		.key(function(d) { return d.symbol; })
		.entries(stocks = data);
		
		symbols.forEach(function(s) {
			s.values.forEach(function(d) { d.date = parse(d.date); d.price = +d.price; });
			s.maxPrice = d3.max(s.values, function(d) { return d.price; });
			s.sumPrice = d3.sum(s.values, function(d) { return d.price; });
		});
		// Sort by maximum price, descending.
		symbols.sort(function(a, b) { return b.maxPrice - a.maxPrice; });
		$scope.chartData = data; 
		$scope.symbols = symbols;
	};
	$scope.chartError = function(errorMsg){            
		$scope.chartData = errorMsg;
	};
	/*** call service to get data **/
	chartFactory.getChartData($scope.chartSuccess,$scope.chartError);	
	$scope.getSelectedSeller = function(selectedSeller){
		console.log(selectedSeller);
		$scope.updateCharts(selectedSeller,$scope.data);
	};
	$scope.updateCharts = function(selectedSeller,data){
		var parse = d3.time.format("%b %Y").parse;
		if(selectedSeller !== 'ALL'){
			data = data.filter(function(d) { return d.symbol  == selectedSeller;});
		}
		// Nest stock values by symbol.
		symbols = d3.nest()
		.key(function(d) { return d.symbol; })
		.entries(stocks = data);
		
		symbols.forEach(function(s) {
			s.values.forEach(function(d) { d.price = +d.price; });
			s.maxPrice = d3.max(s.values, function(d) { return d.price; });
			s.sumPrice = d3.sum(s.values, function(d) { return d.price; });
		});
		// Sort by maximum price, descending.
		symbols.sort(function(a, b) { return b.maxPrice - a.maxPrice; });
		$scope.chartData = data; 
		$scope.symbols = symbols;
	};
}]);