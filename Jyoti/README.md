
## Angular D3 Charts
Link to my [Application](http://jyoti.netlify.com)
### Implementation Details

*   Created following custom directives for different charts:
    *   d3Area
    *   d3Line
    *   d3TransposeBar
    *   d3StackedBar
*   Main focus is to create **Overlapping Area Chart** as per provided mock up
*   Prepared data and created json file containging data **price vs stock** to display chart as per mock up
*   Created controller and services to share data
*   Created factory function for ajax call and retrieving data
*   Using **link function** inside custom directive created charts
*   #### Steps to create Area chart

    *   Define width, height, margin, padding etc for container
    *   Create **SVG container** and set width height etc defined attributes on svg.
    *   Append **g element** to wrap up all child elements inside **SVG**
    *   Create x and y axes using **.axis** function provided by**D3**
    *   Define **Domain and Range** properties for axes to define min max values and area to plot graph inside.
    *   Worked on css to provide design matching mock up e.g. .area, .line classes
    *   Created parallel **vertical lines** as shown in mock up using **tick function in d3, defined tick format, tick values etc.**
    *   Displayed min and max date along x axis and positioned date as shown in mock up
    *   Using text function in d3 displayed **title** for graph
*   Using similar steps and using same data created **multi line chart** and created circle to display legend e.g. AMZN, MSFT
*   Using same data displayed **transpose bar chart** to display individual data for AMZN and MSFT
*   Using same data displayed **stacked bart chart**
*   Created **filter by seller** options
*   On the basis of user selection worked on data to filter and return data accordingly
*   Worked on updating charts on updating data

### Integration Steps:

*   **Following scripts are included in index file.**

    <p>**D3 JS Library file:** <xmp><script src="node_modules/d3/d3.v3.min.js"></script></xmp></p>

    <p>**Service to get chart data:** <xmp><script src="charts/js/services/commonService.js"></script></xmp></p>

    <p>**Directive files for different charts :** <xmp><script src="charts/js/directives/d3AreaChart.js"></script> <script src="charts/js/directives/d3LineChart.js"></script> <script src="charts/js/directives/d3BarChart.js"></script></xmp></p>

    <p>**Controller file :**<xmp><script src="charts/js/mainController.js"></script></xmp></p>

*   **Template file for Directives** : **charts/partials/reports.html** These directives are used for different charts - <xmp><d3-area symbols="symbols" chartData="chartData" colors="colors" opacity="opacity"></d3-area> <d3-line symbols="symbols" chartData="chartData" colors="colors" opacity="opacity"></d3-line> <d3-transpose-bar symbols="symbols" chartData="chartData" colors="colors" opacity="opacity"></d3-transpose-bar> <d3-stacked-bar symbols="symbols" chartData="chartData" colors="colors" opacity="opacity"></d3-stacked-bar></xmp>
*   d3Chart.js file contains all custom directives for charts. There are different types of directives are created for Overlapping area chart, Line chart, Bar chart, staked bar chart etc. Directive uses shared scope so Colors and chartData are used in directive and created in controller scope. Path to directive: **charts/js/directives/d3Chart.js**

*   Controller file provides data and other options required to plot chart. It contains function “UpdateChart() which update chart on changing data. Controller calls service to get json data. Path to controller: charts/js/mainController.js We have provide select drop down to filter data. On the basis of selection, UpdateChart() function gets called in controller and on changing data graph updates .

*   Factory is used to get Ajax data. It collects data from json file located at “charts/data/stocks.json” and return data to controller. Path to factory: charts/js/services/commonService.js Sample data format :

    <xmp>[ { "symbol" : "MSFT", "date" : "Jan 2014", "price" : "16.81" } ]</xmp>
*   All Unit test cases are written in Spec folder at root
