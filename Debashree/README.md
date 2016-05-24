<div class="container-fluid background">

## NVD3

Re-usable charts for d3.js.

<div>This project is an attempt to build re-usable charts and chart components for d3.js without taking away the power that d3.js gives you. This is a very young collection of components, with the goal of keeping these components very customizeable, staying away from your standard cookie cutter solutions.</div>

## About NVD3

<div>NVD3 is currently maintained by a team of frontend software engineers at Novus Partners. Our charting technology is used to provide powerful analytics to our clients in the financial industry. NVD3’s codebase is heavily inspired by the work of Mike Bostock. In particular, his article “Towards Reusable Charts” serves as our guide.</div>

## About POC

<div>

*   A re-usable multiSelect dropdown directive to select which hotels data to be displayed.
*   A custom graph directive where we bind different chart-types and based on the chart type passed from the dropdown and the hotels selected different types graphs are drawn.
*   Isolate scope bindings of custom directive one way,two way and function bindings are used while designing the directives.
*   A pie chart directive to display pie chart on click of legends of the graph directive with the concept of function binding of custom directive.
*   Random data updation for last month data using interval service.
*   Customization of tooltip with our own data.

</div>

### Install

As we are using angular with routing add it to your project and include dependencies to the main html:

<pre>  <<span>script</span> <span>src="angular.min.js"></span><span></span>
  <<span>script</span> <span>src="angular-route.js"></span><span></span>
  </pre>

Add the nv.d3 and d3 assets to your project and include them in the main html

<pre> <<span>script</span> <span>src="d3.min.js "></span><span></span>
 <<span></span>link href="nv.d3.min.css" rel="stylesheet">
 <<span>script</span> <span>src="nv.d3.min.js"</span>><span></span></pre>

*   nv.d3.js should appear after d3.js is included.*   Prefer minified assets (.min) for production.

<div>NVD3 should work with the latest d3.js version 3.5.3 and later.</div>

### Components and Directives

#### 

MultiSelectDropdown Directive

*   A reusable multiselect dropdown directive from where we can select which data to be displayed.*   We need to write the service to get data from the JSON.*   In the controller we assign it to a variable and bind it in the directive.*   Isolate scope bindings of directives used.*   In directive link function write the logic for the selected data.

<pre>Example:
   [
    {
        "name": "Hayyat",
        "checked": true
    },
    {
        "name": "Marriot",
        "checked": true
    }
   ]
 </pre>

<div>

#### 

Graph Directive

A graph directive using nvd3.js to draw following charts(LineChart,MultiBarChart,ScatteredChart,Area Chart)*   A reusable directive where we can show nvd3 graphs having both x and y axis.*   A JSON containing various objects to be displayed .For example: Various hotels data.

<pre>    Example:
[{
  "key": "Hayyat",
  "color": "rgb(184,134,11)",
  "revenue": [{
    "label ": "January Revenue",
    "value": 3,
    "color": "#FFBB78"
  }, {
    "label": "February revenue",
    "value": 6,
    "color": "#D62728"
  }],
  "values": [{
    "x": 0,
    "y": 30,
    "label": "JAN"
  }, {
    "x": 1,
    "y": 40,
    "label": "FEB"
  }]
}, {
  "key": "Marriot",
  "color": "rgb(184,134,11)",
  "revenue": [{
    "label": "January revenue",
    "value": 34,
    "color": "#FFBB78"
  }, {
    "label": "February revenue",
    "value": 1 6,
    "color": "#D62728"
  }],
  "values": [{
    "x": 0,
    "y": 3,
    "label": "JAN"
  }, {
    "x": 1,
    "y": 4,
    "label": "FEB"
  }]
}]
</pre>

*   Here it take a Json where we have an array having x and y attribute which contains data and its value to be displayed.*   In controller we call the service to get data from the JSON and assign it to a variable which is two way binded in the directive.*   We have applied logic such that those value selected in the multiselect dropdown, only there data displayed in the graph.*   Customization applied with the help of chart.tooltip.contentGenerator () function to make our own tooltip.

<pre>Example
[
  'lineChart',
  'scatterChart',
  'multiBarChart',
  'stackedAreaChart',
  'multiBarHorizontalChart'
];
</pre>

*   We have binded the Chart Type with the directive, so that based on the chart type selected from a dropdown particular chart will be drawn.</div>

#### 

Pie Directive

*   Clicking on the legend in the graph directive for a particular hotel we store the object in a particular variable” data2” and bind it in the pie directive.*   So based on the hotel clicked its revenue data is displayed in the pie chart.</div>