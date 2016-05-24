//app.factory('chartData', ['$http', function($http){
//
//return{
//	getChartData : function(successCback,errorCback){
//		return $http.get('app/home/data1.json').then(
//		function(resp){
//		successCback(resp.data);
//		},
//		function(error){
//		errorCback(error);
//		});
//	}
//	
//	}
//}]);
//
app.factory('chartData', ['$http', function($http){

return{
	getChartData : function(){
		return $http.get('app/home/data1.json');
	}
	
	}
}]);

