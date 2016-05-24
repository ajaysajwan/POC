# Chart Demo(ZingCharts)
Link to my Application(http://sobha.netlify.com/zingChart.html)

Library Used: ZingChart(http://www.zingchart.com)

#Zing Chart POC details:

*   Zing chart library is used. There are options to create bar, line pie etc.It have angular already created angular directive

#Zingchart-angularjs directive Details:

*   zingchart-angularjs: zingchart-angularjs is a Zing Chart angular directive which can be used directly in HTML as a attribute to implement Zing chart.

#Other attributed required: 
*   Id:  Unique Identifier for your chart
*   ZC-JSON: Json Data that will be passed to Zingchart library from directive
*   ZC-height and zc-width:  optional parameter to set height and width to chart element
*   zc-editable:  To make graph editable at run time
*   Zc-mobile:  It will divide a graph in to shared graph if screen is small otherwise for desktop it will show as normal graph on same axis

#Customized functionality: 
*   Change in chart type: A pie chart can be converted into bar chart or vice versa according to user need.
*   Change in Axis: We can convert horizontal chart to vertical one opr vise versa
*   Change the value of particular node at run time: Click on any node, and enter the new value in the text box. we can change its value at run time.
*   Mobile View: If screen size is greater than 900 then graph can be seen with on different axis else for desktop it will be on same axis.

#Customized Code: 
*   ShowChart(_json,$scope):  Show chart will be triggered if ZC-mobile attribute is present. Check screen size and call chart render from zingchart library according to screen size.
*   nodeClick (node,scope):  Check currently clicked node. Get clicked node and update seriesSelected and valueSelected values
*   JSON service to call JSON data: • Hit json service to call json data and save it in variable
*   changeNodeValue (JSON):  update node value. Get seriesSelected and valueSelected and update value of that node
*   changeAxis (JSON): switch x and y axis.

#Integration Steps: 
*   Files to be included: 
*   Angular Library:  https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js
*   zingchart library:  assets/lib/zingchart.min.js
*   directives : directives/zingchart-angularjs.js
*   controller:  controllers/script.js
*   services :  services/jsonCall.js
*   add a directive in your HTML page:   
        <div zingchart id="chart-1" zc-json="myJson" zc-width="100%" zc-height="568px"></div>
*   JSON service to call JSON data: • Hit json service to call json data and save it in variable
*   Define JSON data:  
		{  
			"type":"line",  
			"backgroundColor":"white",  
			"series":[  
				{  
				"values":[  
				1, 10, 7, 4, 30, 40, 4 ],  
				},  
			]  
        }  

*   To perform Action on your chart include these buttons:   
        <button ng-click="changeAxis(jsondata);">change axis</button>  
        <button ng-click="changeNodeValue(jsondata)"> append </button>
*   Mobile Chart : If you want to make your chart mobile friendly add zc-mobile="true" attribute
