mainApp.factory('chartFactory',['$http',function($http){
	return{        
        getChartData: function(successCallBackFunction,errorCallBackFunction){
             $http.get("charts/data/stocks.json").then(function(responseData){                 
                 return successCallBackFunction(responseData.data);
             },function(error){                 
                 return errorCallBackFunction(error.data);
             });
        }
    }
}]);
