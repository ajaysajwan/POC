
# BOOKING PERFORMANCE ENGINE
The application is designed using angularjs and D3 library.  

Link to the application :  (http://sakshi-d3.netlify.com/)


Booking Performance Engine is a small dashboard application to show the booking performances of different hotels through different sources. Also, to have brief information on bookings made and revenues for the different regions.


## About

The apllication has 3 directives:

   1\. Donut Chart Directive

   2\. Gauge Chart Directive

   3\. Bar Chart Directive

### 1.Donut Chart Directive
 

#### SYNTAX:

<span><</span>donut stroke="'#fff'" width="600" height="600" radius="50" property="'revenue'" colours="donutColours" ng-model="donutModel" mouseclick="onClickSetModel(model)">

#### FEATURES:

*   Donut chart is made using the d3 library from the json data containing information about different sources of bookings and their corresponding revenues that are regionwise.

*   Tooltip on hover, having source name and revenue in it.

*   Legend for all the source type, highlighted in the corresponding color.

*   The colours is an user defined array of colours in controller.(not mandetory to provide colors, Can select random colors from d3.)

*   Handles the click event, click on any portion of chart, 2 new charts will open:  

    1. Gauge chart to show the bookings of selected source  
    2. Bar chart to show regional revenues for selected source.



### 2\. Gauge Chart Directive



#### SYNTAX:

<span><</span>div d3-gauge id="test-div" width="300" height="200" min-value="0" max-value="3000" start-color="#DED5D5" end-color="#3389C5" value="demoValue" color="selectedColor">

#### FEATURES:

   * Gauge chart is made using the d3 library to show the bookings.

   * Show the booking into number having color of selected source from donut chart

   * Get updated when click on "live demo" button.



### 3\. Bar Chart Directive


#### SYNTAX:

<span><</span>bar-chart height="options.height" data="barChartData" color="selectedColor">

#### FEATURES:

*    Bar chart is made using the d3 library to show the regionwise revenues of selected source in donut chart.

*    Show the tooltip on hover.

*    Get updated when click on "live demo" button.



## Installation Steps:

#### Install using node module

1. npm install angular  

2. npm install d3  

3. npm install d3-tip  

#### Refer all dependencies in your page in right order


<span><</span>script src="node_modules/angular/angular.min.js" type='text/javascript'>  

<span><</span>script src="node_modules/d3/d3.min.js" type='text/javascript'>  

<span><</span>script src="node_modules/d3-tip/index.js" type='text/javascript'>  


#### Add the following directives as dependency in your module


<span>angular.module('yourApp', ['donutDirective', 'barChartDirective', 'gaugeDirective']); </span> 


