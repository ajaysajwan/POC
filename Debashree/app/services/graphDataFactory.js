myApp.factory('dataFetch', ['$http', function($http) {
  return {
    getAllHotels: function() {
      return $http.get('../assets/json/graphData.json');
    }
  }
}]);