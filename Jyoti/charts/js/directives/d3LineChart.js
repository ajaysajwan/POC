/*** Line Chart **/
  mainApp
    .directive('d3Line', ['$window',function($window) {
      return {
        restrict: 'EA',
        scope:{
            symbols : "=",
            chartData : "=",
            settings : "="
        },
	    link: function(scope, element, iAttrs) {
		angular.element($window).bind('resize', function() {
			Update();
		});
		scope.$watch('symbols', Update);
		function Update(newSymbols) {
		if(scope.symbols !== undefined){
			var data = scope.chartData;	
			var width = angular.element(element).parent()[0].clientWidth;
			var m = scope.settings.m,
			w = width - m[1] - m[3],
			h = scope.settings.height - m[0] - m[2];

			var x,y,duration = scope.settings.duration, delay = scope.settings.delay, opacity = scope.settings.opacity;
			var colors = scope.settings.colors;
		          
            
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