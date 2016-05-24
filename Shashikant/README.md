# About Chart POC
Link to my [Application](http://shashikant.netlify.com)

### <u>Application Structure</u>

I have followed the application structure which is described by **John Papa** [https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#application-structure](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#application-structure)

In this poc application, I have use chart is for creating a dashboard page. In which I have been displaying booking user data with different data distribution.

*   Polar Area Chart
*   Bar Chart
*   Pie chart
*   Download Chart as an Image
*   Progress Bar(Profit & Loss status)

#### There are two reusable directive, which i created -

*   Download Chart as an Image
*   Progress Bar(Profit & Loss status)

#### Download Chart as an Image-

Using this directive you can download an image of canvas content.

#### Progress Bar(Profit & Loss status)-

Using this directive you can create chart like prgress bar. which will display data in percentage

### <u>Integration Setp</u>

#### Component List-

*   Polar Area Chart
*   Bar Chart
*   Pie chart
*   Download Chart as an Image
*   Progress Bar(Profit & Loss status)

#### Polar Area Chart, pie char and Bar Chart -

I have used http://carlcraig.github.io/tc-angular-chartjs/ third party library.

<pre>angular.module( 'app', ['tc.chartjs']);</pre>

#### Description-

In Polar Area chart – If we click on any area, it will display the bar chart and Progress Bar (Profit & Loss status) as per the clicked area. In a controller, we are calling getBookingDetails service inside click function and creating data objects for bar chart and progress bar chart as per the data required structure and assign. Pie chart- I have display pie chat as per the age-group which you can select form drop down. Onchange dropdown value, we are calling method showAgeGroupChart() of controller. In side method, we are calling services and assign data as per the selected age group.

<pre>
Data.Json structure-
[
    {
        "2016": [
            {
                "JAN": {
                    "ageGroup": {
                        "ageGroup2035": {
                            "totalBooking": 220
                        },
                        "ageGroup3550": {
                            "totalBooking": 250
                        },
                        "ageGroup5070": {
                            "totalBooking": 323
                        }
                    },
                    "profit": 60,
                    "mTotalBooking": 793
                },
                "FEB": {
                    "ageGroup": {…..},
                    "profit": 64,
                    "mTotalBooking": 1132
                }
	“MAR”:{…..},
	.
	.	
	.
            }
        ]
    }
]

</pre>

#### Download Chart as an Image-

Include AngularJS, directive and bootstrap file

<pre><<span>link</span> <span>rel</span>=<span class="pl-s"><span>"</span>stylesheet<span>"</span></span> <span>href</span>=<span class="pl-s"><span>"</span>node_modules/bootstrap/dist/css/bootstrap.min.css<span>"</span></span>></<span>link</span>>
<<span>script</span> <span>type</span>=<span class="pl-s"><span>"</span>text/javascript<span>"</span></span> <span>src</span>=<span class="pl-s"><span>"</span>js/angular.js<span>"</span></span>></<span>script</span>>
<<span>script</span> <span>type</span>=<span class="pl-s"><span>"</span>text/javascript<span>"</span></span> <span>src</span>=<span class="pl-s"><span>"</span>js/chart.directive.js<span>"</span></span>></<span>script</span>>
</pre>

#### Add download-chart-image directive in html-

<pre><<span>download-chart-image</span> class="download-icon" chart-id="canvas1" image-name="booking-count-chart.png"></<span>download-chart-image</span>>
</pre>

*   chart-id- In chart id, assign canvas id which you want to save as an image.
*   image-name- From which name you want to save image.

#### Progress Bar(Profit & Loss status)-

Include AngularJS file, directive and bootstrap

<pre><<span>script</span> <span>type</span>=<span class="pl-s"><span>"</span>text/javascript<span>"</span></span> <span>src</span>=<span class="pl-s"><span>"</span>js/angular.js<span>"</span></span>></<span>script</span>>
<<span>script</span> <span>type</span>=<span class="pl-s"><span>"</span>text/javascript<span>"</span></span> <span>src</span>=<span class="pl-s"><span>"</span>js/chart.directive.js<span>"</span></span>></<span>script</span>>
</pre>

Add Injector -

<pre>angular.module( 'app', ['app.directive']); </pre>

Add canvas element in html

<pre><<span>canvas</span> id="myCanvas" width="210" height="50" canvas-rect options="profitAndLossOptions"></<span>canvas</span>>
<<span>canvas</span> id="tip" width=160 height=25 ></<span>canvas</span>>
</pre>

1) options - In options, we need to assign option object. There are some property to show profit & Loss chart

<pre>width- width of canvas
height- height of canvas
increaseBy - At a time % fill on box. Example- 1+1 or 1+10 
interval - color fill speed in millisecond
fill - % Fill color by in rectangle box
fillColor- Fill color code
borderColor - Border color code 

$scope.profitAndLossOptions = {
            width: 200,
            height: 30,
            increaseBy: 1,
            interval: 8
        }; 

</pre>
