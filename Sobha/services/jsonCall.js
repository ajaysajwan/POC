app.factory('jsonService', function($http) {
	return {
		fetch:function(jsonId) {
		return $http.get("json/"+jsonId+".json");
		}
	}
});



