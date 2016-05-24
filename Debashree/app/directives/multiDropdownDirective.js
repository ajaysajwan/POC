/*A multiSelectDropdown Directive.
  To select what data to be displayed from dropdown by clicking on the checkbox.
  Isolate scope bindings oneWat,Two way and function bindings used.

*/

myApp.directive('dropdownMultiselect', function() {
  return {
    restrict: 'E',
    scope: {
      model: '=',
      options: '=',
      totalOption: '@',
      dropdownTitle: '@',
      checkAll: '=?'
    },
      
    template: "<button ng-click='open=!open' class='btn btn-default custom-multiselect-dropdown' data-ng-class='{open: open}'>" +
      "<div class='display-inline' ng-if ='dropdownTitle === totalOption'>All</div><div class='display-inline' ng-if ='dropdownTitle !== totalOption'>{{dropdownTitle}} Selected</div><div class='caret  display-inline'></div>" +
      "<ul class='dropdown-menu scrollable-menu' aria-labelledby='dropdownMenu'>" +
      "<li><input type='checkbox' data-ng-change='checkAllClicked()' data-ng-model= checkAll>All</li>" +
      "<li data-ng-repeat='option in options'> <input type='checkbox' checked data-ng-change='setSelectedItem(option)' ng-model='option.checked'>{{option.name}}</li>" +
      "</ul>" + "</button>",
      
    link: function($scope) {
      $scope.checkAll = true;
      $scope.$watch('options', selectOption);
        
      // To push all hotels to model initially
      function selectOption() {
        angular.forEach($scope.options, function(initOption) {
          $scope.model.push(initOption.name);
        });
      };
      $scope.checkAllClicked = function() {
        if ($scope.checkAll) {
          selectAll();
        } else {
          deselectAll();
        }
      }

      function selectAll() {
        $scope.model = [];
        angular.forEach($scope.options, function(option) {
          option.checked = true;
          $scope.model.push(option.name);
        });
      };

      function deselectAll() {
        $scope.model = [];
        angular.forEach($scope.options, function(option) {
          option.checked = false;
        });
      };
        
      //Push the selected hotel to model
      $scope.setSelectedItem = function(option) {
        var filteredArray = [];
        if (option.checked == true) {
          $scope.model.push(option.name);
          if ($scope.model.length == $scope.options.length) {
            $scope.checkAll = true;
          }
        } else {
          filteredArray = $scope.model.filter(function(value) {
            return value != option.name;
          });
          $scope.model = filteredArray;
          $scope.checkAll = false;
        }
        return false;
      };
    }
  }
});