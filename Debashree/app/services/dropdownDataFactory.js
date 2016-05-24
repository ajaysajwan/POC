myApp.factory('dropDownData', ['$http', function($http) {
  return {
    getDropDownOptions: function() {
      return $http.get('../assets/json/dropdownData.json');
    }
  }
}]);