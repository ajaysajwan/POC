'use strict';
(function main($angular, $d3) {
    $angular.module('donutDirective', []).directive('donut', function ngDonut() {

        return {

            restrict: 'EA',

            require: 'ngModel',

            scope: {
                dataset: '=ngModel',
                height: '=',
                width: '=',
                radius: '=',
                colours: '=',
                property: '=',
                stroke: '=',
                strokeWidth: '=',
                mousemove: '&',
                mouseleave: '&',
                mouseclick: '&'
            },


            template: '<div ng-include="\'app/views/legend.html\'"></div>' +
                '<div class="tooltip" ng-show="model1.pointer" ng-style="{ \'left\': (model1.pointer[0] + 20) + \'px\', \'top\': model1.pointer[1] + \'px\' }">' +
                '{{model1.sourceName}}: <strong>{{model1.revenue}}</strong>' +
                '</div>',


            controller: ['$scope', function controller($scope) {

                /**
                 * @property colour
                 * @type {Function}
                 */
                var colour = $d3.scale.category20();

                /**
                 * @property currentAngles
                 * @type {Object}
                 */
                $scope.currentAngles = {};

                /**
                 * @method getColour
                 * @param colourIndex {Number}
                 * @return {String}
                 */
                $scope.getColour = function(colourIndex) {

                    // Use the user defined colours if the developer has defined them, and the current index
                    // is available.
                    if ($scope.colours && $scope.colours.length > colourIndex) {
                        return $scope.colours[colourIndex];
                    }

                    // ...Otherwise we'll fallback to using the D3 category 20 colours.
                    return colour(colourIndex);

                };

                /**
                 * @method getTranslate
                 * @return {String}
                 */
                $scope.getTranslate = function getTranslate() {
                    return 'translate(' + $scope.getWidth() / 2 + ',' + $scope.getHeight() / 2 + ')';
                };

                /**
                 * @method getWidth
                 * @return {Number}
                 */
                $scope.getWidth = function getWidth() {
                    return $scope.width || 400;
                };

                /**
                 * @method getHeight
                 * @return {Number}
                 */
                $scope.getHeight = function getHeight() {
                    return $scope.height || 400;
                };

                /**
                 * @method getRadius
                 * @return {Number}
                 */
                $scope.getRadius = function getRadius() {
                    return $scope.radius || (Math.min($scope.getWidth(), $scope.getHeight()) / 2);
                };

                /**
                 * @method clean
                 * @param dataset {Array}
                 * @return {Array}
                 */
                $scope.clean = function clean(dataset) {

                    return dataset.map(function map(value) {

                        if ($scope.property) {

                            if (isNaN(Number(value[$scope.property]))) {
                                value[$scope.property] = 0;
                            } else {
                                value[$scope.property] = Number(value[$scope.property]);
                            }

                            return value;

                        }

                        if (isNaN(Number(value))) {
                            return 0;
                        }

                        return Number(value);

                    });

                };


                /**
                 * Computes the pointer relative to the container, rather than D3's approach of being
                 * relative to the centre point of the container.
                 *
                 * @method computePointer
                 * @param context {Object}
                 * @return {Array}
                 */
                $scope.computePointer = function computePointer(context) {

                    var mouse = $d3.mouse(context);
                    var x = mouse[0] + ($scope.getWidth()/2),
                        y = mouse[1] + ($scope.getHeight()/2);

                    return [x, y];

                };

                /**
                 * @method listenForEvents
                 * @param path {Object}
                 * @return {void}
                 */
                $scope.listenForEvents = function listenForEvents(path) {

                    if ($scope.mousemove) {

                        path.on('mousemove', function onMouseMove(event) {

                            var model = event.data;
                            model.pointer = $scope.computePointer(this);
                            $scope.model1 = model;
                            
                            // Listen for the user hovering over the arcs.
                            $scope.mousemove({
                                model: event.data
                            });
                            $d3.select(this).attr("fill-opacity", ".7");
                            $scope.$apply();

                        });

                    }

                    if ($scope.mouseleave) {

                        path.on('mouseleave', function onMouseLeave(event) {
                            $scope.model1 = null;
                            // Listen for when the user leaves the arcs.
                            $scope.mouseleave({
                                pointer: $scope.computePointer(this)
                            });
                            $d3.select(this).attr("fill-opacity", "1");
                            $scope.$apply();

                        });

                    }

                };

            }],

            /**
             * @method link
             * @param scope {Object}
             * @param element {angular.element}
             * @return {void}
             */
            link: function link(scope, element) {

                var radius, pie, arc, svg, path, oldThis;

                /**
                 * @method createDonut
                 * @return {void}
                 */
                scope.createDonut = function createDonut() {
                    radius = Math.min(scope.getWidth(), scope.getHeight()) / 2.5;
                    pie = $d3.layout.pie().sort(null).value(function value(model) {
                        return scope.property ? model[scope.property] : model;
                    });
                    arc = $d3.svg.arc().innerRadius(radius).outerRadius(radius - scope.getRadius());
                    svg = $d3.select(element[0]).append('svg')
                        .attr('width', scope.getWidth())
                        .attr('height', scope.getHeight())
                        .append('g')
                        .attr('transform', scope.getTranslate());
                    path = svg.selectAll('donut path')
                        .data(pie(scope.clean(scope.dataset)))
                        .enter().append('path')
                        .attr('fill', function(d, i) {
                            return scope.dataset[i]['color'] = scope.getColour(i);
                        })
                        .attr('d', arc)
                        .each(function(d) {
                            this._current = d;
                        });

                    scope.donutModel = path.data();


                    // Listen for the mouse events!
                    scope.listenForEvents(path);

                    path.on('click', function onClick(d) {
                        scope.model = d.data;

                        if (scope.mouseclick) {
                            if (oldThis != this) {
                                scope.mouseclick({
                                    model: d.data
                                });
                            } else {
                                scope.mouseclick({
                                    model: null
                                });
                            }
                        }

                        d3.selectAll('donut path')
                            .style("stroke", "none")
                            .style("opacity", function() {
                                return 1;
                            })
                            /*.transition()
                            .attr("transform", function(d) {
                                return "translate(0,0)"
                            })*/;

                        if (oldThis != this) {
                            scope.showModel = true;
                            oldThis = this;
                            d3.select(this)
                                .style("stroke", "black")
                                .style("stroke-width", "2px")
                                .style("opacity", function() {
                                    return 0.8;
                                })
                                /*.transition()
                                .duration(500)
                                .ease("bounce")
                                .attr("transform", function(d) {
                                    var c = arc.centroid(d),
                                        x = c[0],
                                        y = c[1],
                                        h = Math.sqrt(x * x + y * y);
                                    return "translate(" + ((x / h) * 10) + ',' + ((y / h) * 10) + ")"
                                })*/;

                        } else {
                            scope.showModel = false;
                            oldThis = null;
                        }
                    });



                    if (scope.stroke) {
                        path.attr('stroke', scope.stroke);
                    }

                    if (scope.strokeWidth) {
                        path.attr('stroke-width', scope.strokeWidth)
                    }

                };



                /**
                 * @method tweenArc
                 * @param arcModel {Object}
                 * @return {Function}
                 */
                scope.tweenArc = function tweenArc(arcModel) {

                    var i = $d3.interpolate(this._current, arcModel);
                    this._current = i(0);
                    return function(t) {
                        return arc(i(t));
                    };

                };

                // Listen for any changes to the dataset...
                scope.$watch('dataset', function datasetChanged() {

                    if (scope.dataset.length === 0) {
                        return;
                    }

                    if (!pie) {

                        // Create the donut shape as we have the data.
                        scope.createDonut();
                        return;

                    }

                    // Otherwise it's an update as we have an existing donut.
                    path.data(pie(scope.clean(scope.dataset)));
                    path.transition().duration(750).attrTween('d', scope.tweenArc);

                }, true);

            }

        };

    });

})(window.angular, window.d3);