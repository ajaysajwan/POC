app.directive('lineChart', function ($timeout) {
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
            data.addColumn('string', 'label');
            data.addColumn('number', 'Min');
			data.addColumn('number', 'Max');
			data.addColumn('number', 'Avg');
			//data.addColumn('number', 'Value2');
			var chart = new google.visualization.LineChart($elm[0]);
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
				if (!draw.triggered) {
                    draw.triggered = true;
                    $timeout(function () {
                        draw.triggered = false;
                        var label, value;
                        data.removeRows(0, data.getNumberOfRows());
                        angular.forEach($scope.data, function (row,value) {
                            label = row[0].c[0].v;
                            stack1 = parseFloat(row[0].c[1].v);
							stack2 = parseFloat(row[0].c[2].v);
							stack3 = parseFloat(row[0].c[3].v);
                            data.addRow([label, stack1, stack2, stack3]);
                        });
                        var options = {
							animation: {
								"startup": true,
								duration: 500,
							},
                            title: "Sales per month",
							responsive : true,
							lineWidth: 3,
							legend:{position: 'bottom'},
							curveType : 'function',
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
						//chart1.draw(data, options);
                        // No raw selected
                        $scope.selectFn({
                            selectedRowIndex: undefined
                        });
                    }, 0, true);
                }
            }
        }
    };
});