app.directive('colChart', function ($timeout) {
    return {
        restrict: 'EA',
        scope: {
            title: '@title',
            width: '@width',
            height: '@height',
            data: '=data',
            selectFn: '&select'
        },
        link: function ($scope, $elm, $attr) {
		// Create the data table and instantiate the chart
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'month');
            data.addColumn('number', 'Max');
			data.addColumn('number', 'Min');
			data.addColumn('number', 'Avg');
            var chart = new google.visualization.ColumnChart($elm[0]);
            draw();

            // Watches, to refresh the chart when its data, title or dimensions change
            $scope.$watch('data', function () {
                draw();
            }, true); // true is for deep object equality checking
            $scope.$watch('title', function () {
                draw();
            });
            $scope.$watch('width', function () {
                draw();
            });
            $scope.$watch('height', function () {
                draw();
            });
			function draw() {
				if(!draw.triggered) {
                    draw.triggered = true;
                    $timeout(function () {
                        draw.triggered = false;
                        var label, stack1, stack2;
                        angular.forEach($scope.data, function (row,value) {
                            label = row[0].c[0].v;
                            stack1 = parseFloat(row[0].c[1].v);
							stack2 = parseFloat(row[0].c[2].v);
							stack3 = parseFloat(row[0].c[3].v);
                            data.addRow([label, stack1, stack2, stack3]);
                        });
                        var options = {
							chart:{
                            title: "Sales per month",
							subtitle: "Profit and loss chart"},
							isStacked : true,
							responsive : true,
							colors: ["#6191a5","#98c62f","#4bc3a8"],
							bar: {groupWidth: "45%"},
                                'width': $scope.width,
                                'height': $scope.height,
								"vAxis": {
									"title": "Sales unit in %",
								    "gridlines": {
									"count": 10
								  }
								},
								"hAxis": {
								  "title": "Months ->"
								}
                        };
                        chart.draw(data, options);
                    }, 0, true);
               }
            }
        }
    };
});