/*dashboard.factory.js
*ChartFactory-
*There is a only one method-
*1. getBookingDetails() - which will return the booking details.
*/

(function () {
    'use strict';
    angular.module('dashboard.factory', [])
        .factory('ChartFactory', ChartFactory);

    ChartFactory.$inject = ['$http'];

    function ChartFactory($http) {
        return {
            getBookingDetails: function () {
                return $http.get('data/data.json');
            }
        }
    }
})();