'use strict';
d3.custom = {};

d3.custom.barChart = function module() {
    var margin = {
            top: 20,
            right: 20,
            bottom: 40,
            left: 40
        },
        width = 500,
        height = 500,
        gap = 0,
        ease = 'cubic-in-out';
    var svg, duration = 500;

    function exports(_selection) {
        _selection.each(function(_data) {

            var chartW = width - margin.left - margin.right,
                chartH = height - margin.top - margin.bottom;

            var x1 = d3.scale.ordinal()
                .domain(_data.map(function(d) {
                    return d.name;
                }))
                .rangeRoundBands([0, chartW], .1);

            var y1 = d3.scale.linear()
                .domain([0, d3.max(_data, function(d) {
                    return d.revenue;
                })])
                .range([chartH, 0]);

            var xAxis = d3.svg.axis()
                .scale(x1)
                .orient('bottom');

            var yAxis = d3.svg.axis()
                .scale(y1)
                .tickFormat(function (d) {
                    var prefix = d3.formatPrefix(d);
                    return prefix.scale(d) + prefix.symbol;
                })
                .orient('left');

            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function(d) {
                    return "<strong>" + d.name + ":</strong> <span style='color:red'>" +
                        (Math.round(d.revenue * 100) / 100) +
                        "</span>";
                })


            var barW = chartW / _data.length;

            if (!svg) {
                svg = d3.select(this)
                    .append('svg')
                    .classed('chart', true);

                var container = svg.append('g').classed('container-group', true);
                container.append('g').classed('chart-group', true);
                container.append('g').classed('x-axis-group axis', true);
                container.append('g').classed('y-axis-group axis', true);
            }

            svg.transition().duration(duration).attr({
                width: width,
                height: height
            })
            svg.select('.container-group')
                .attr({
                    transform: 'translate(' + margin.left + ',' + margin.top + ')'
                });
            svg.call(tip);
            svg.select('.x-axis-group.axis')
                .transition()
                .duration(duration)
                .ease(ease)
                .attr({
                    transform: 'translate(0,' + (chartH) + ')'
                })
                .call(xAxis);

            svg.select('.y-axis-group.axis')
                .transition()
                .duration(duration)
                .ease(ease)
                .call(yAxis);

            var gapSize = x1.rangeBand() / 100 * gap;
            var barW = x1.rangeBand() - gapSize;
            var bars = svg.select('.chart-group')
                .selectAll('.bar')
                .data(_data);
            bars.enter().append('rect')
                .classed('bar', true)
                .attr({
                    fill: _data.color,
                    x: chartW,
                    width: barW,
                    y: function(d) {
                        return y1(d.revenue);
                    },
                    height: function(d) {
                        return chartH - y1(d.revenue);
                    }
                })

            .on('mouseover', tip.show)
                .on('mouseout', tip.hide);
            bars.transition()
                .duration(duration)
                .ease(ease)
                .attr({
                    fill: _data.color,
                    width: barW,
                    x: function(d) {
                        return x1(d.name) + gapSize / 2;
                    },
                    y: function(d) {
                        return y1(d.revenue);
                    },
                    height: function(d) {
                        return chartH - y1(d.revenue);
                    }
                });
            bars.exit().transition().style({
                opacity: 0
            }).remove();

            duration = 500;

        });
    }
    exports.width = function(_x) {
        if (!arguments.length) return width;
        width = parseInt(_x);
        return this;
    };
    exports.height = function(_x) {
        if (!arguments.length) return height;
        height = parseInt(_x);
        duration = 0;
        return this;
    };
    exports.gap = function(_x) {
        if (!arguments.length) return gap;
        gap = _x;
        return this;
    };
    exports.ease = function(_x) {
        if (!arguments.length) return ease;
        ease = _x;
        return this;
    };
    return exports;
};