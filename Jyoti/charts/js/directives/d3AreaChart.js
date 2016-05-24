(function () {
  'use strict';

  mainApp.directive('d3Area', ['$window',function($window) {
      return {
        restrict: 'EA',
        scope:{
            symbols : "=",
            chartData : "=",
            colors : "=",
            opacity: "="
        },
		link: function(scope, iElement, iAttrs) {
			angular.element($window).bind('resize', function() {
                Update();
            });
			scope.$watch('symbols', Update);
			function Update() {
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
	
}());
