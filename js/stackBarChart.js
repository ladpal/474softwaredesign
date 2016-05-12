function stackBarChart() {
    var width = 500;
    var height = 500;
    var x;
    var y;
    var csvdata = [];
    var xScaling;
    var yScaling;
    var currDirectory;
    var fileGlobal;
    var padding = 0.1

    function setGraph() {
	x = d3.scale.ordinal()
	    .rangeRoundBands([0, width]);
	y = d3.scale.linear()
	    .range([height, 0]);    
    }

    function getCsvData() {
	d3.csv(fileGlobal, function(data) {
	    csvdata = cleanData(data);
	    setScales();
	    createGraph();
	});
    }

    function cleanData(data) {
	var colNames = [];
	for (key in data[0])
	    colNames.push(key);
	var i = 0;
	var formattedData = d3.layout.stack()(colNames.map(function(length) {
	    i = 0;
            return data.map(function(d) {
		return {x: i++, y: +d[length]};
            });
	}));
	return formattedData;
    }

    function setScales() {
	console.log(csvdata);
	xScaling = d3.scale.ordinal()
	    .domain(d3.range(csvdata[0].length))
	    .rangeRoundBands([0, width], padding);
	yScaling = d3.scale.linear()
	    .range([0, height])
	    .domain([0, d3.max(csvdata, function(d) {
		return d3.max(d, function(d) {
		    return d.y0 + d.y;
		});
	    }) ]);
    }

    function createGraph() {
	var colorScale = d3.scale.category20();
	var svg = d3.select("body")
	    .append("svg")
	    .attr("width", width)
	    .attr("height", height);
	
	var barGroup = svg.selectAll("g")
	    .data(csvdata)
	    .enter()
	    .append("g")
	    .style("fill", function(d, i) {
		return colorScale(i);
	    });

	var rects = barGroup.selectAll("rect")
	    .data(function(d) {return d;})
	    .enter()
	    .append("rect")
	    .attr("x", function(d, i) {
		return xScaling(i);
	    })
	    .attr("y", function(d) {
		return height - yScaling(d.y) - yScaling(d.y0);
	    })
	    .attr("height", function(d) {
		return yScaling(d.y);
	    })
	    .attr("width", xScaling.rangeBand());
    };

    this.displayGraph = function() {
	setGraph();
	getCsvData();
    };

    this.Width = function(value) {
	if(value === undefined)
	    return width;
	width = value;
    };

    this.Height = function(value) {
	if(value === undefined)
	    return height;
	height = value;
    };

    this.Padding = function(value) {
	if(value === undefined)
	    return padding;
	padding = value;
    };


    this.FileGlobal = function(value) {
	if(value === undefined)
	    return fileGlobal;
	fileGlobal = value;
    };

};
