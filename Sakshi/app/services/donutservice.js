'use strict';
(function main(angular) {
    angular.module('donutApp').service('DonutService', ['$http', function($http) {
        this.getDonutModel = function() {
            return $http.get('data/chartModelData.json');
        };
    }]);
})(window.angular);