## About the POC of charts
Link to my [Application] ( http://omkar.netlify.com/ )
Library Used : Angular google charts (ng-google-chart.min.js) (installed with npm)
#### Angular Google Chart

I have made a POC using Angular Google Charts. Where I am showing graphical representation of website visitors count across the world. The charts mainly focus on distribution of data across the main continents like asia, oceania, europe etc. for the year 2015

*   I have used Angular Google Charts for this perticular POC. Angular-Google-Chart is nothing but a Directive Module for Google Chart Tools in Angular JS. This simple directive takes much of the work out of the initial setup of a basic Google Chart.  
    This directive is attribute level  
    <xmp><div google-chart chart="chart1"></div></xmp>
*   The first chart (top left) is column chart and shows data months vs visitors count for all the continents.  
    I have applied a filter using select dropdown, which filters and shows data only for selected continent
*   The Second chart (top right) is by default Area chart and shows data months vs visitors count for all the continents.  
    I have given various buttons to change the chart types (bar chart, line chart etc) for the same data. Here only chart type property is changed as per button value.
*   The third chart (bottom left ) is Geo Chart, which shows a map with all continents and has various color shades as per data values  
    Also I have applied a month filter which shows data only for selected month of year 2015
*   The fourth chart (bottom right) is a Pie chart has two filters of month and region. It will show the data for sub regions of selected regions (in %) for the selected month of 2015
*   I have created a json file as a data source with random values



## Angular Google Charts : Integration Steps

Google Charts API is a full-featured JavaScript chart library, available for free. It is powerful, simple to use, and free. Angular-Google-Chart is nothing but a Directive Module for Google Chart Tools in Angular JS. This simple directive takes much of the work out of the initial setup of a basic Google Chart.  
**Below are the integration steps for Angular Google Charts**

### Step 1: Install
After installing all required libraries to your index page like angular.js, 
You can install it using NPM or Bower or CDN path

**NPM**  
`npm install angular-google-chart –-save`  
**Bower**  
`bower install angular-google-chart#0.1.0 –-save`  

( then add it to your index file)

`<script src="node_modules/angular-google-chart/ng-google-chart.min.js">`

( Or you can give CDN path, Angular Google Chart is hosted with cdnjs.com.)  
**CDN**

`<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-google-chart/0.1.0/ng-google-chart.min.js" type="text/javascript">`

### Step 2: Add Module Dependency to your App

Inject the dependency of Google charts into your module

`angular.module('myApp', ['googlechart']);`

### Step 3: Add google chart directive markup

Add google chart directive markup into your controller element in html page

<xmp><div ng-controller="myController"> <div google-chart chart="chart1"></div> </div></xmp>

### Step 4: Setup an object with your chart data and options

Inside your controller code, setup a chart object and its data and options as shown below

<xmp>var chart1 = {}; chart1.type = "AreaChart"; chart1.data = { "cols": chartColumns, // Array of column values for chart "rows": chartRows // Array of rows values for chart }; chart1.options = { "title": "Website Visitors per month", "isStacked": "true", "colors": ['#003E5D', '#05643C', '#009D5A', '#7ECFA3', '#C7F465'], "displayExactValues": true, "animation": { 'duration': 1000, 'easing': 'out', 'startup': true }, "vAxis": { "title": "Visitors Count", "gridlines": { "count": 6 } }, "hAxis": { "title": "Month" } }; chart1.formatters = {}; $scope.chart1 = chart1; // use this chart name in the markup</xmp>  

### Further Description for above Code

#### Data

Data for the chart should be in following format (its pre-decided format for google charts) and can be assign to your chart object as below

<xmp>chart1.data = { "cols": [{id: "t", label: "Topping", type: "string"}, {id: "s", label: "Slices", type: "number"} ], "rows": [{c: [{v: "Mushrooms"},{v: 3}]}, {c: [{v: "Olives"},{v: 31}]}, {c: [{v: "Zucchini"},{v: 1}]}, {c: [{v: "Pepperoni"},{v: 2}]} ]}; }</xmp>

If you have JSON data file, you can convert / arrange data in above format, assign it to separate variables for columns and rows and then pass to the chart object as -

<xmp>chart1.data = { "cols": chartColumns, // Array of column values for chart "rows": chartRows // Array of rows values for chart };</xmp>

**Note:** Above data format works for almost all chart types, though there are some chart types for which Data format may differ, you can view below link  
[http://angular-google-chart.github.io/angular-google-chart/docs/latest/examples/](http://angular-google-chart.github.io/angular-google-chart/docs/latest/examples/)

#### Chart Type

You can change the chart Type by following line of code. There are various types of charts available with Google charts, like BarChart, AreaChart, ColumnChart, LineChart etc. (Chart type should be mentioned in specific format only, like First Letter of each word should be Capital ex. – BarChart )

<xmp>chart1.type = "AreaChart";</xmp>

#### Chart Options

Every chart type has many customizable options, including title, colors, line thickness, background fill, and so on. For this, documentation is available on below link. [https://developers.google.com/chart/interactive/docs/basic_customizing_chart#specify-options](https://developers.google.com/chart/interactive/docs/basic_customizing_chart#specify-options)

Some basic options explained below

<xmp>chart1.options = { "title": "You can define title/label for your chart here", "isStacked": (true / false)in case of multiple columns, shows stacked presentation in graph. "colors": [you can define array of colours you want to display for each column], "displayExactValues": (true/false) displays exact values if true not round Off. "vAxis": {// set properties for vertical axis "title": "Visitors Count", "gridlines": {"count": 6 } // Shows no. of grid lines of values to be shown }, "hAxis": {// set properties for Horizontal axis "title": "Month" } , "width": You can define width in pixels, "height": You can define width in pixels, "legend":" can define legend position (top/bottom/right/left) (default right)" };</xmp>

There are many options for customizations are available different for different chart types, which can be seen at the link provided above.

#### Using GeoChart

**For geo chart, the integration process is slightly different.**  
Below is the chart object for Geo Chart

<xmp>var chart3 = {}; chart3.type = "GeoChart"; chart3.data = dataMap; // data format for geoChart is different chart3.options = { title: "Website Visitors for January", region: 'world', resolution: 'continents', // Defines map resolution countries, continent etc colorAxis: { colors: ['#aec7e8', '#003366']// creates colour range of defined colors }, dataMode: 'regions', // defines data mode }; chart3.formatters = {}; $scope.chart3 = chart3;</xmp>

**Data :** Data format for geo chart is different .

<xmp>[ ['Country', 'Popularity'], ['Germany', 200], ['United States', 300], ['Brazil', 400], ['Canada', 500], ['France', 600] ]</xmp>

Where first column is Region location name and other column is for values.  

Region location [String, Required] - A region to highlight. All of following formats are accepted. You can use different formats in different rows:

*   A country name as a string (for example, "England"), or an uppercase ISO-3166-1 alpha-2 code or its English text equivalent (for example, "GB" or "United Kingdom").
*   An uppercase ISO-3166-2 region code name or its English text equivalent (for example, "US-NJ" or "New Jersey").

Rest process is same for geochart. For more customization and documentation you can refer [https://developers.google.com/chart/interactive/docs/gallery/geochart#overview](https://developers.google.com/chart/interactive/docs/gallery/geochart#overview)