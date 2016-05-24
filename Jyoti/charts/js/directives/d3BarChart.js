/*** Transposrt Bar Chart **/
  mainApp
    .directive('d3TransposeBar', ['$window',function($window) {
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
				h = 300 - m[0] - m[2];

				var x,y,duration = scope.settings.duration, delay = scope.settings.delay, opacity = scope.settings.opacity;

				var colors = scope.settings.colors;   
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
				h = 300 - m[0] - m[2];

				var x,y,duration = scope.settings.duration, delay = scope.settings.delay, opacity = scope.settings.opacity;

				var colors = scope.settings.colors;   
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