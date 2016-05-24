var myJson1={  globals: {
            shadow: false,
            fontFamily: "Verdana",
            fontWeight: "100"
        },
        type: "nestedpie",
        backgroundColor: "#fff",
        legend: {
            layout: "x5",
            position: "50%",
            borderColor: "transparent",
            marker: {
                borderRadius: 10,
                borderColor: "transparent"
            }
        },
        tooltip: {
            text: "%v requests"
        },
        plot: {
            refAngle: "-90",
            borderWidth: "0px",
            valueBox: {
                placement: "in",
                text: "%npv %",
                fontSize: "15px",
                textAlpha: 1,
            }
        },
		 "series": [
        {"values":[59,55,30,28,15]},
        {"values":[60,50,35,30,20]},
        {"values":[50,40,30,20,10]} 
    ]
   
    }
	
	var myJson2={
        globals: {
            shadow: false,
            fontFamily: "Verdana",
            fontWeight: "100"
        },
     
  "type": "bar",
  
  "plot": {
    "bars-space-left": "25%",
    "bars-space-right": "25%",
    "tooltip": {//HTML Tooltips
      "text": "<table border='1'><tr><td colspan=2><strong>%kl</strong></td></tr><tr><td style='width:100px'><input type='text'></input></td><td style='width:100px'><em>%kl</em> picked %v %t in this year's berry picking contest.</td></tr></table>",
      "html-mode": true
    }
  },
  "scale-x": {
    "labels": ["Alice", "Brett", "Chris", "Donna", "Emily", "Frank"]
  },
  "scale-y": {
    "values": "0:150:50"
  },
  legend: {
            layout: "x5",
            position: "50%",
            borderColor: "transparent",
            marker: {
                borderRadius: 10,
                borderColor: "transparent"
            }
        },
		editable:true,
  "series": [{
    "values": [64, 50, 34, 30, 90, 99],
    "background-color": "#666699",
    "text": "blackberries",
    "data-photo": "<img src='http://www.zingchart.com/images/blackberry.jpg' height='80' width='100'>"
  }, {
    "values": [70, 77, 134, 114, 130, 65],
    "background-color": "#66ccff",
    "text": "blueberries",
    "data-photo": "<img src='http://www.zingchart.com/images/blueberry.jpg' height='80' width='100'>"
  }, {
    "values": [30, 34, 15, 16, 59, 64],
    "background-color": "#ff9999",
    "text": "cloudberries",
    "data-photo": "<img src='http://www.zingchart.com/images/cloudberry.jpg' height='80' width='100'>"
  }]      
      
    }
	
	var myJson3= {
      type : "bar",
      title:{
        backgroundColor : "transparent",
        fontColor :"blue",
        text : "TravelClick"
      },
      backgroundColor : "white",
      series : [
        {
          values : [1,10,7,4],
          backgroundColor : "#666699"
        },
		{
          values : [10,11,2,5],
          backgroundColor : "#4DC0CF"
        }
      ],
	  editable:true,
	  legend: {
            layout: "x5",
            position: "50%",
            borderColor: "transparent",
            marker: {
                borderRadius: 10,
                borderColor: "transparent"
            }
        },
		// The label below will be your 'value-box'
    "labels":[
        {
            // This id allows you to access it via the API
            "id":"label1",
            "text":"",
            // The hook describes where it attaches
            "hook":"node:plot=0;index=2",
            "border-width":2,
            "background-color":"black",
			"color":"white",
            "callout":1,
            "offset-y":"-30%",
            // Hide it to start
            "visible":false,
            "font-size":"14px",
            "padding":"5px"
        }
    ],
    }
	
	myJson4 = {
      type : "bar",
      title:{
        backgroundColor : "transparent",
        fontColor :"blue",
        text : "TravelClick"
      },
      backgroundColor : "white",
      series : [
        {
          values : [1,10,7,4],
          backgroundColor : "#666699"
        },
		{
          values : [10,11,2,5],
          backgroundColor : "#4DC0CF"
        }
      ],
	  editable:true,
	  legend: {
            layout: "x5",
            position: "50%",
            borderColor: "transparent",
            marker: {
                borderRadius: 10,
                borderColor: "transparent"
            }
        },
		// The label below will be your 'value-box'
    "labels":[
        {
            // This id allows you to access it via the API
            "id":"label1",
            "text":"",
            // The hook describes where it attaches
            "hook":"node:plot=0;index=2",
            "border-width":2,
            "background-color":"black",
			"color":"white",
            "callout":1,
            "offset-y":"-30%",
            // Hide it to start
            "visible":false,
            "font-size":"14px",
            "padding":"5px"
        }
    ],
    }