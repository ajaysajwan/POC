### TravelClick
Link to my [Application](http://sarita.netlify.com)

I have used <a href="https://github.com/angular-google-chart/angular-google-chart" target="_blank">angular-google-chart</a> third party library.

#### **Purpose -**<span>Make angular google chart of monthly sales in percentage which will show all the profit and loss in respective months and their customization.Angular-Google-Chart is a directive Module for Google Chart in Angular JS.</span>

#### **1) External Libraries used -**

1.  [https://www.google.com/jsapi](https://www.google.com/jsapi "go to link")
2.  [angular-google-chart.js](https://github.com/angular-google-chart/angular-google-chart "go to link")
3.  [lib/angular-animate.min.js](https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.0/angular-animate.js "go to link")
4.  [js/jquery-min.js](https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js "go to link")

#### **2) Chart Data**

<span>We have an external JSON file which contains the data to show in the chart.</span>

**JSON data format :**

<xmp>[{ "month":"Apr'16", "value1":60, "value2": 10, "value3": 43 }, { "month":"May'16", "value1":-61, "value2": 43, "value3": -31 }]</xmp> <span>Google has its own data format to form charts, so we should convert it into google's own format</span>

**Google's data format :**

<xmp>“data”:{ “cols”: [ { “id” : “month”, “label” : “month”, “type” : “number” }, { “id” : “country”, “label” : “country”, “type” : “string” } }], “rows”:[ { “c” :[ { “v”: “May” }, { “v” : “May” }, { “v” : 25 } ] “c” : [{. . . . . . . }] } ]};</xmp>

#### **3) Controller**

<span>While getting JSON data through $http request we have to convert it into google data format</span> <xmp>$http.get('js/data.json').success(function(response){ $scope.data = response; } for(i=0;i<$scope.data.length;i++){ chartdata.push([{ c: [{ v: $scope.data[i].month}, {v:$scope.data[i].value1},{v:$scope.data[i].value2}, {v:$scope.data[i].value3}]}]); } $scope.chartData = chartdata; // copy of data into array chartData.</xmp>

#### **4) Custom Directives**

<span>Created custom directives of type “EA” for all the charts with isolated scopes. Created one constructor of google.visualization.Datatable() inside link function. It represents a two-dimensional, mutable table of values in which each column is assigned a data type, several optional properties including an ID, label, and pattern string.</span>

`var data = new google.visualization.DataTable();`

<span>It represents a two-dimensional, mutable table of values in which each column is assigned a data type, several optional properties including an ID, label, and pattern string.</span> <span>**Add columns for the chart**</span>

`data.addColumn('string', 'label');`

`data.addColumn('number', 'Min');`

`data.addColumn('number', 'Max');`

<span>Add rows to the Datatable with the data coming from JSON</span>

`data.addRow([label, stack1, stack2, stack3]);`

<span>stacks are the min , max and average profit.</span>

$watch has been added to watch and refresh the chart when data , width , height etc get changed.

**Types of Charts :**

1.  Column Chart
2.  Pie Chart
3.  Bar Chart
4.  Line Chart
5.  Area Chart

#### **5) Animation and Customization**

1.  Time delay during chart loading
2.  ease : 'out' - chart gets loaded from slow to fast
3.  curveType : 'function' in line chart to draw functional chart
4.  isStacked : true - to make the chart values stacked
5.  responsive : true - to make the graph responsive
6.  Custom legend for Piechart - on hover it sets the offset to 0.2
7.  Bar chart groupWidth : value in % (sets the width of each bar according to % given)
