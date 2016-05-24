(function () {
  'use strict';

  mainApp.directive('d3Area', ['$window',function($window) {
      return {
        restrict: 'EA',
		link: function(scope, iElement, iAttrs) {
			angular.element($window).bind('resize', function() {
                Update();
            });
			scope.$watch('symbols', Update);
			function Update(newSymbols) {
				if(scope.symbols !== undefined){
					var data = scope.chartData;	
					var width = angular.element(iElement).parent()[0].clientWidth;
					var m = [20, 20, 30, 20],
					w = width - m[1] - m[3],
					h = 250 - m[0] - m[2];

					var x,y,duration = 200,delay = 200;

					var colors = scope.colors;
					if(d3.select(iElement[0]).select("svg")){ 
						d3.select(iElement[0]).select("svg").remove(); 
					}
					var svg = d3.select(iElement[0]).append("svg")
					.attr("width", w )
					.attr("height", h + m[0] + m[2])
					.append("g")
					//.attr("height", 150)
					.attr("transform", "translate(" + m[3] + "," + m[0] + ")");
					
					svg.append("text")
					.attr("x", (w / 2)-20)             
					.attr("y", 0 - (m[1] / 5))
					.attr("text-anchor", "middle")  
					.style("font-size", "14px") 
					.style("fill", "#35679A")  
					.style("font-weight","bold")
					.text("GDS PRODUCTION YOY");

					var stocks,
					symbols = scope.symbols;
					
					// A line generator, for the dark stroke.
					var axis = d3.svg.line()
						.interpolate("basis")
						.x(function(d) { return x(d.date); })
						.y(h);

					// A area generator, for the dark stroke.
					var area = d3.svg.area()
						//.interpolate("basis")
						.x(function(d) { return x(d.date); })
						.y1(function(d) { return y(d.price); });
									
					var g = svg.selectAll("g")
						  .data(symbols)
						  .enter().append("g")
						  .attr("class", "symbol")
						  .attr("transform", "translate(0," + -50 + ")")
						  setTimeout(overlappingArea, duration);
					function overlappingArea(){								
						x = d3.time.scale().range([0, w - 60]);
						y = d3.scale.linear().range([h, 100]);
						
						var xAxis = d3.svg.axis()
						.scale(x)
						.orient("bottom");

						var yAxis = d3.svg.axis()
						.scale(y)
						.orient("left");
						
						// Compute the minimum and maximum date across symbols.
						x.domain([
							d3.min(symbols, function(d) { return d.values[0].date; }),
							d3.max(symbols, function(d) { return d.values[d.values.length - 1].date; })
						]);
						var xScale = d3.time.scale().range([0, w - 16]);	
						xScale.domain([
							d3.min(symbols, function(d) { return d.values[0].date; }),
							d3.max(symbols, function(d) { return d.values[d.values.length - 1].date; })
						]);	
						var g = svg.selectAll(".symbol");
						y
						  .domain([0, d3.max(symbols.map(function(d) { return d.maxPrice; }))])
						  .range([h, 100]);

						area
						  .y0(h)
						  .y1(function(d) { return y(d.price); });

						var t = g.transition()
						  .duration(duration);
						  
						/** to draw vertical lines */
						function make_x_axis() {
													
							return d3.svg.axis()
								.scale(xScale)
								 .orient("bottom")
								 .ticks(4)
						}
						g.each(function(d) {
						 d3.select(this).selectAll(".area")
						 .data(d3.range(3))
						 .enter().insert("path", ".line")
						 .attr("class", "area")
						 .filter(function(d, i) { return i; })
						 .attr("d", area(d.values))		
						 .remove();	
						});
						  
						g.select(".area")
						  .style("fill-opacity", function(d) { return scope.opacity[d.key]; })
						  .style("fill", function(d, i) { return colors[d.key]; })
						  .attr("d", function(d) { return area(d.values); });		
						  
						/*svg.append("g")
						  .attr("class", "x axis")
						  .attr("transform", "translate(0," + h + ")")
						  .call(xAxis);*/
						  
						svg.append("g")         
						.attr("class", "grid")
						.attr("transform", "translate(0," + (h-40) + ")")
						.call(make_x_axis()
							.tickSize(-h+80, 0, 0)
							.tickFormat("")
						);
						/* Date displaying along x axis */
						var xMin = d3.min(symbols, function(c) { return d3.min(c.values, function(v) { return v.date; }); });
						var xMax = d3.max(symbols, function (c) { return d3.max(c.values, function (v) { return v.date; }); });

						x.domain([xMin,xMax]);

						var xAxis = d3.svg.axis()
							.scale(x)
							.tickFormat(d3.time.format('%b %Y'))
							.orient("bottom")
							.tickValues([xMin, xMax]);
						svg.append("g")
						  .attr("class", "x axis")
						  .attr("transform", "translate(0," + (h-40) + ")")
						  .call(xAxis)
						  .selectAll("text")
						  .style("text-anchor","start");
				        d3.select(d3.selectAll("text")[0].pop()).style("text-anchor","end");	
                        /*** Price displaying along x axis */
						
						var xMinPrice = symbols[0].sumPrice;
						var xMaxPrice = symbols[1].sumPrice;
						x.domain([xMinPrice,xMaxPrice]);
						var xAxis = d3.svg.axis()
							.scale(x)
							.tickFormat(function(d) { return parseFloat(d).toFixed(0); })
							.orient("bottom")
							.tickValues([xMinPrice, xMaxPrice]);
						svg.append("g")
						  .attr("class", "x axis price")
						  .attr("transform", "translate(0," + (h-20) + ")")
						  .call(xAxis)
						  .selectAll("text")
						  .style("color","#72A3BA")
						  .style("text-anchor","start");						  
				        d3.select(d3.selectAll("text")[0].pop()).style("text-anchor","end");	
					}
				}
			}			
		}
      };
  }]);
/*** Line Chart **/
  mainApp
    .directive('d3Line', ['$window',function($window) {
      return {
        restrict: 'EA',
	    link: function(scope, element, iAttrs) {
		angular.element($window).bind('resize', function() {
			Update();
		});
		scope.$watch('symbols', Update);
		function Update(newSymbols) {
		if(scope.symbols !== undefined){
			var data = scope.chartData;	
			var width = angular.element(element).parent()[0].clientWidth;
			var m = [20, 20, 30, 20],
			w = width - m[1] - m[3],
			h = 150 - m[0] - m[2];

			var x,y,duration = 1500,delay = 500;
			var colors = scope.colors;
			
			if(d3.select(element[0]).select("svg")){ 
				d3.select(element[0]).select("svg").remove(); 
			}
			var svg = d3.select(element[0]).append("svg")
			.attr("width", w + m[1] + m[3])
			.attr("height", h + m[0] + m[2])
			.append("g")
			.attr("transform", "translate(" + m[3] + "," + m[0] + ")");

			var stocks,	symbols = scope.symbols;
			
			// A line generator, for the dark stroke.
			var line = d3.svg.line()
				.x(function(d) { return x(d.date); })
				.y(function(d) { return y(d.price); });

			// A line generator, for the dark stroke.
			var axis = d3.svg.line()
				.x(function(d) { return x(d.date); })
				.y(h);

			var g = svg.selectAll("g")
				  .data(symbols)
				.enter().append("g")
				  .attr("class", "symbol");
				setTimeout(lines, duration);
			function lines(){			
				line
				.y(function(d) { return y(d.price); });	
				x = d3.time.scale().range([0, w - 60]);
				y = d3.scale.linear().range([h, 0]);
				// Compute the minimum and maximum date across symbols.
				x.domain([
				d3.min(symbols, function(d) { return d.values[0].date; }),
				d3.max(symbols, function(d) { return d.values[d.values.length - 1].date; })
				]);
				var xAxis = d3.svg.axis()
						.scale(x)
						.orient("bottom");
				var g = svg.selectAll(".symbol")
					   .attr("transform", function(d, i) { return "translate(0," + (i * h / 10) + ")"; });
				svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + h + ")")
				.call(xAxis);
				var cc =0;
				g.each(function(d) {
				var e = d3.select(this);
				e.append("path")
					.attr("class", "line")
					.style("stroke", function(d, i) { return colors[d.key]; });					 

				e.append("circle")
					.attr("r", 5)
					.style("fill", function(d, i) { return colors[d.key]; })
					.style("stroke", "#000")
					.style("stroke-width", "2px");

				e.append("text")
					.attr("x", 12)
					.attr("dy", ".31em")
					.text(d.key);
				cc++;
				});

				function draw(k) {
					g.each(function(d) {
					  var e = d3.select(this);
					  y.domain([0, d.maxPrice]);

					  e.select("path")
						  .attr("d", function(d) { return line(d.values.slice(0, k + 1)); });

					  e.selectAll("circle, text")
						  .data(function(d) { return [d.values[k], d.values[k]]; })
						  .attr("transform", function(d) { return "translate(" + x(d.date) + "," + y(d.price) + ")"; });
					});
				}
				var k = 1, n = symbols[0].values.length;
				d3.timer(function() {
					draw(k);
					if ((k += 2) >= n - 1) {
					  draw(n - 1);
					  return true;
					}
				});
			}
		}
	}
  }
 };
}]);
/*** Transposrt Bar Chart **/
  mainApp
    .directive('d3TransposeBar', ['$window',function($window) {
      return {
        restrict: 'EA',
		link: function(scope, element, iAttrs) {
			angular.element($window).bind('resize', function() {
                Update();
            });
			scope.$watch('symbols', Update);
			function Update(newSymbols) {
			if(scope.symbols !== undefined){
				var data = scope.chartData;	
				var width = angular.element(element).parent()[0].clientWidth;
				var m = [20, 20, 30, 20],
				w = width - m[1] - m[3],
				h = 300 - m[0] - m[2];

				var x,y,duration = 1500,delay = 500;

				var colors = scope.colors;
				var i =0;
				if(d3.select(element[0]).select("svg")){ 
					d3.select(element[0]).select("svg").remove(); 
				}
				var svg = d3.select(element[0]).append("svg")
				.attr("width", w + m[1] + m[3])
				.attr("height", h + m[0] + m[2])
				.append("g")
				.attr("transform", "translate(" + m[3] + "," + m[0] + ")");

				var stocks,	symbols=scope.symbols;
								
				var g = svg.selectAll("g")
					   .data(symbols)
					   .enter().append("g")
					  .attr("class", "symbol");
				
				setTimeout(transposeBar, duration);
				function transposeBar(){
				    					  
				  x = d3.scale.ordinal()
				  .domain(symbols.map(function(d) { return d.key; }))
				  .rangeRoundBands([0, w], .5);
				  
				  var xScale = d3.scale.ordinal()
				  .domain(symbols.map(function(d) { return d.key; }))
				  .rangeRoundBands([0, w-30], .5);
				  var xAxis = d3.svg.axis()
						.scale(xScale)
						.orient("bottom");
					svg.append("g")
						  .attr("class", "x axis")
						  .attr("transform", "translate(0," + h + ")")
						  .call(xAxis);	
				  y = d3.scale.linear().range([h, 0]);
				  y
					.domain([0, d3.max(symbols.map(function(d) { return d3.sum(d.values.map(function(d) { return d.price; })); }))]);

					var stack = d3.layout.stack()
					.x(function(d, i) { return i; })
					.y(function(d) { return d.price; })
					.out(function(d, y0, y) { d.price0 = y0; });

					stack(d3.zip.apply(null, symbols.map(function(d) { return d.values; }))); // transpose!

					var g = svg.selectAll(".symbol");					
					var t = g.transition()
					.duration(duration / 2);				
					
					 g.each(function(p, j) {
						d3.select(this).selectAll("rect")
							.data(function(d) { return d.values; })
						  .enter().append("rect")	
							.attr("y", function(d) { return y(d.price0 + d.price) - 1; })
							.attr("height", function(d) { return h - y(d.price) + 1; })
							.attr("x", function(d) { return x(d.symbol); })
							.attr("width", x.rangeBand())
							.style("fill", function(d) { return colors[d.symbol]; })
							.style("fill-opacity", 1e-6)
							.transition()
							.duration(duration)
							.style("fill-opacity", 1);
							i++;
					 });
					t.selectAll("rect")
					.delay(function(d, i) { return i * 10; });				

					t.select("text")
					.attr("x", 0)
					.attr("transform", function(d) { return "translate(" + (x(d.key) + x.rangeBand() / 2) + "," + h + ")"; })
					.attr("dy", "1.31em")
					.each("end", function() { d3.select(this).attr("x", null).attr("text-anchor", "middle"); });

					svg.select("line").transition()
					.duration(duration)
					.attr("x2", w);		
				}
			}
		  }
        }
      };
    }]);
	
	/*** Stacked Bar Chart **/
  mainApp
    .directive('d3StackedBar', ['$window',function($window) {
      return {
        restrict: 'EA',
		link: function(scope, element, iAttrs) {
			angular.element($window).bind('resize', function() {
                Update();
            });
			scope.$watch('symbols', Update);
			function Update(newSymbols) {
			if(scope.symbols !== undefined){
				var width = angular.element(element).parent()[0].clientWidth;
				var m = [20, 20, 30, 20],
				w = width - m[1] - m[3],
				h = 300 - m[0] - m[2];

				var x,y,duration = 1500,delay = 500;

				var colors = scope.colors;
				var i =0;
				if(d3.select(element[0]).select("svg")){ 
					d3.select(element[0]).select("svg").remove(); 
				}
				var svg = d3.select(element[0]).append("svg")
				.attr("width", w + m[1] + m[3])
				.attr("height", h + m[0] + m[2])
				.append("g")
				.attr("transform", "translate(" + m[3] + "," + m[0] + ")");

				var stocks,	symbols = scope.symbols;	
				
				var g = svg.selectAll("g")
				  .data(symbols)
				  .enter().append("g")
				  .attr("class", "symbol");
				setTimeout(stackedBar, duration);
				function stackedBar(){	
					x = d3.scale.ordinal()
					  .domain(symbols[0].values.map(function(d) { return d.date; }))
					  .rangeBands([0, w - 60], .1);
					  
					x.rangeRoundBands([0, w - 60], .1);
					var x1 = d3.scale.ordinal()
					  .domain(symbols.map(function(d) { return d.key; }))
					  .rangeBands([0, x.rangeBand()]);
					y = d3.scale.linear();
					var stack = d3.layout.stack()
					  .values(function(d) { return d.values; })
					  .x(function(d) { return d.date; })
					  .y(function(d) { return d.price; })
					  .out(function(d, y0, y) { d.price0 = y0; })
					  .order("reverse");

					var g = svg.selectAll(".symbol");

					stack(symbols);

					y
					  .domain([0, d3.max(symbols[0].values.map(function(d) { return d.price + d.price0; }))])
					  .range([h, 0]);
					g.each(function(p, j) {
						d3.select(this).selectAll("rect")
						.data(function(d) { return d.values; })
						.enter().append("rect")
						.attr("x", function(d) { return x(d.date) + x1(p.key); })
						.attr("y", function(d) { return y(d.price); })
						.attr("width", x1.rangeBand())
						.attr("height", function(d) { return h - y(d.price); })
						.style("fill", function(d) { return colors[d.symbol]; })						
					  .transition()
						.duration(duration)
						.style("fill-opacity", 1);
						i++;
					});
					var t = g.transition()
					  .duration(duration / 2);
				
					t.select("text")
					  .delay(symbols[0].values.length * 10)
					  .attr("transform", function(d) { d = d.values[d.values.length - 1]; return "translate(" + (w - 60) + "," + y(d.price / 2 + d.price0) + ")"; });
					
					t.selectAll("rect")
					  .delay(function(d, i) { return i * 10; })
					  .attr("y", function(d) { return y(d.price0 + d.price); })
					  .attr("height", function(d) { return h - y(d.price); })
					  .each("end", function() {
						d3.select(this)
							.style("stroke", "#fff")
							.style("stroke-opacity", 1e-6)
						  .transition()
							.duration(duration / 2)
							.attr("x", function(d) { return x(d.date); })
							.attr("width", x.rangeBand())
							.style("stroke-opacity", 1);
					  });
				}
			}
		  }
        }
      };
    }]);	
	
	
}());
