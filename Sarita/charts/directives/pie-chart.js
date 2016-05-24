app.directive('pieChart', function ($timeout) {
    return {
        restrict: 'EA',
        scope: {
            title: '@title',
            width: '@width',
            height: '@height',
            data: '=data',
			clickfun :'&'
        },
        link: function ($scope, $elm, $attr) {

            // Create the data table and instantiate the chart
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'label');
            data.addColumn('number', 'Min');
			var chart = new google.visualization.PieChart($elm[0]);
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
                            data.addRow([label, stack1]);
                        });
						var colors = ["#3366cc","#dc3912","#ff9900","#109618","#990099","#0099c6","#dd4477","#4d8000","#8a2323","#254a70","#733373","#1a8073"];
						var legend = document.getElementById('legend');
    					var lis = [];
						for (var i = 0; i < data.getNumberOfRows(); i++){							
							// get the data
							var label = data.getValue(i, 0);
							var value = data.getValue(i, 1);
							// create the legend entry
							lis[i] = document.createElement('li');
							lis[i].setAttribute('data-row',i);
							lis[i].setAttribute('data-value',value);
							lis[i].id = 'legend_' + data.getValue(i, 0);
							lis[i].innerHTML = '<div class="legendMarker" style="background-color:' + colors[i] + ';" ></div>' + label + ': ' + value +'</span>';
							
							// append to the legend list
							legend.appendChild(lis[i]);
						}						
                        var options = {
                            title: "Sales per month",
							is3D: true,
							titleTextStyle: {color:'#000'},
							bar: {groupWidth: "45%"},
							legend:{position:'none'},
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
						$('#legend li').hover(function () {
							options.slices = options.slices || {};
							// clear all slice offsets
							for (var x in options.slices) {
								options.slices[x].offset = 0;
							}
							// set the offset of the slice associated with the hovered over legend entry
							options.slices[$(this).data('row')] = options.slices[$(this).data('row')] || {};
							options.slices[$(this).data('row')].offset = 0.2;
							chart.draw(data, options);
						}, function () {
							options.slices = options.slices || {};
							// clear all slice offsets
							for (var x in options.slices) {
								options.slices[x].offset = 0;
							}
							chart.draw(data, options);
						})						
                    }, 0, true);
                }
            }
        }
    };
});
