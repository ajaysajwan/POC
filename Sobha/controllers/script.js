var app = angular.module('chartDemo', ['zingchart-angularjs']);
app.controller('MainController', ['$scope', 'jsonService', function($scope, jsonService) {

    jsonService.fetch('JSON1').then(function(resp) {
        $scope.myJson = resp.data;
        console.log(resp.data);

    }, function(error) {
        console.log(error);
    });
    jsonService.fetch('JSON2').then(function(resp) {
        $scope.myJson2 = resp.data;
        console.log(resp.data);
    }, function(error) {
        console.log(error);
    });
    jsonService.fetch('JSON3').then(function(resp) {
        $scope.myJson3 = resp.data;
        console.log(resp.data);
    }, function(error) {
        console.log(error);
    });

    $scope.myJson4 = {
        "type": "bar",
        "title": {
            "text": "Destop View"
        },
        "series": [{
            "values": [69, 68, 54, 48, 70, 74, 98, 70, 72, 68, 49, 69],
            "text": "Apple",
            "background-color": "#767F59"
        }, {
            "values": [20, 48, 94, 48, 60, 70, 20, 30, 12, 92, 49, 69],
            "text": "Apple",
            "background-color": "#E0B13F"
        }],

    };

    $scope.changeNodeValue = function(jsonData) {
        var seriesVal = parseInt($scope.seriesSelected) - 1;
        var valueVal = parseInt($scope.valueSelected) - 1;
        if (isNaN(seriesVal) || isNaN(valueVal)) {
            alert('Select a value');
        } else {
            var aappendedValue = $scope.appendedValue;
            jsonData.series[seriesVal].values[valueVal] = parseInt(aappendedValue);
        }
    }
    cloneJson = function(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }
    $scope.myJson5 = cloneJson($scope.myJson4);

    $scope.changeAxis = function(jsonData) {
        var type = jsonData.type;
        if (type.charAt(0) === 'h')
            type = type.substr(1);
        else
            type = 'h' + type;
        jsonData.type = type;
    }
    $scope.changeType = function(jsonData,type) {
       jsonData.type = type;
    }
}]);