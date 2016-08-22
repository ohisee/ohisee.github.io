/*
 * Draw chart using Dimple JS
 */
function drawCharts(data) {
	"use strict";
	var margin = 80;
	var width = 1400;
	var height = 400;
	var datam = [{ "year": "1997", "campus": "San Jose", "attendance": "10" },
		{ "year": "1997", "campus": "Sunnyvale", "attendance": "20" },
		{ "year": "1998", "campus": "San Jose", "attendance": "20" },
		{ "year": "1998", "campus": "Sunnyvale", "attendance": "20" },
		{ "year": "1999", "campus": "San Jose", "attendance": "32" },
		{ "year": "1999", "campus": "Sunnyvale", "attendance": "10" },
		{ "year": "2000", "campus": "Sunnyvale", "attendance": "27" },
		{ "year": "2000", "campus": "San Jose", "attendance": "19" },
		{ "year": "2001", "campus": "San Jose", "attendance": "18" },
		{ "year": "2001", "campus": "Sunnyvale", "attendance": "29" }
	];

	//debugger;
	var div = d3.select("#content")
		.append("h2")
		.text("World Cup Attendance")
		.style("font-family", "Arial, Helvetica, sans-serif")
		.style("padding-left", "1cm");
	var svg = d3.select("#content")
		.append("svg")
		.attr("width", width).attr("height", height);
	var chart = new dimple.chart(svg, data);
	chart.setBounds(90, 50, 1000, 305);
	var x = chart.addTimeAxis("x", "year");
	x.dateParseFormat = "%Y";
	x.tickFormat = "%Y";
	x.timeInterval = 2;
	chart.addMeasureAxis("y", "attendance");
	//chart.addColorAxis("attendance", "#FF0000");
	chart.addSeries(null, dimple.plot.line);
	chart.addSeries(null, dimple.plot.scatter);
	chart.draw();
	svg.selectAll("circle").style("fill", "#FF0000");

	//debugger;
	var pieSvg = d3.select("#pie")
		.append("svg")
		.attr("width", width - 880).attr("height", height);
	var pieChart = new dimple.chart(pieSvg, datam);
	pieChart.setBounds(20, 20, 460, 360);
	pieChart.addMeasureAxis("p", "attendance");
	pieChart.addSeries("campus", dimple.plot.pie);
	pieChart.addLegend(400, 30, 100, 100, "left");
	pieChart.draw();
};

/**
 * Transform data
 * Date format 27-05-1934 (16:00 h)
 */
var date_format = d3.time.format("%d-%m-%Y (%H:%M h)");

function transformType(data) {
	data["date"] = date_format.parse(data["date"]);
	data["attendance"] = +data["attendance"];
	return data;
};

/**
 * Draw chart using D3 JS
 */
function drawGeoChart(data) {
	"use strict";
	var margin = { "top": 20, "right": 30, "bottom": 30, "left": 40 };
	var width = 1200 - margin.left - margin.right;
	var height = 420 - margin.top - margin.bottom;
	var radius = 5;
	var legend_y_up = 3;
	var legend_x = 10;
	var color = "rgb(255, 128, 0)";
	var svg = d3.select("#geocontent").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var x_time_extent = d3.extent(data, function(d) {
		return d['date'];
	});

	var y_count_extend = d3.extent(data, function(d) {
		return d['attendance'];
	});

	var min_date = d3.min(data, function(d) {
		return d['date'];
	});

	var p_min_date = new Date(min_date.getFullYear() - 1, 0, 1);

	var max_date = d3.max(data, function(d) {
		return d['date'];
	});

	var incr_date = function(one_date, step) {
		var dt = new Date(one_date);
		dt.setFullYear(one_date.getFullYear() + step);
		return dt;
	};

	var date_range = function(min_date, max_date, step = 4) {
		var r = new Array();
		r.push(min_date);
		var dt = incr_date(min_date, step);
		while(dt < max_date) {
			r.push(dt);
			dt = incr_date(dt, step);
		}
		r.push(max_date);
		return r;
	};

	// Render X time scale, positioning at margin left to width
	var x_time_scale = d3.time.scale()
		.range([margin.left, width])
		.domain([min_date, max_date]);

	var y_count_scale = d3.scale.linear()
		.range([height, 0])
		.domain(y_count_extend);

	var x_time_axis = d3.svg.axis()
		.scale(x_time_scale)
		.tickValues(date_range(min_date, max_date))
		.tickFormat(d3.time.format("%Y"));

	var y_count_axis = d3.svg.axis()
		.orient("left")
		.scale(y_count_scale)
		.tickValues(d3.range(y_count_extend[0], y_count_extend[1], y_count_extend[0] * 5));

	var x_grid = function() {
		return d3.svg.axis()
			.scale(x_time_scale)
			.innerTickSize(-height)
			.outerTickSize(0)
			.tickValues(date_range(min_date, max_date))
			.tickFormat("");
	};

	var y_grid = function() {
		return d3.svg.axis()
			.orient("left")
			.scale(y_count_scale)
			.tickValues(d3.range(y_count_extend[0], y_count_extend[1], y_count_extend[0] * 5))
			.innerTickSize(-width + margin.left)
			.outerTickSize(0)
			.tickFormat("");
	}

	svg.append("g")
		.style({
			"fill": "none",
			"stroke": "black",
			"shape-rendering": "crispEdges"
		})
		.attr("transform", "translate(0," + height + ")")
		.call(x_time_axis)
		.selectAll("text")
		.style({
			"font-family": "sans-serif",
			"font-size": "10px",
			"fill": "black",
			"stroke": "none"
		});

	svg.append("g")
		.style({
			"fill": "none",
			"stroke": "black",
			"shape-rendering": "crispEdges"
		})
		.attr("transform", "translate (" + margin.left + ", 0)")
		.call(y_count_axis)
		.selectAll("text")
		.style({
			"font-family": "sans-serif",
			"font-size": "10px",
			"fill": "black",
			"stroke": "none"
		});

	// X grid
	// svg.append("g")
	// 	.style({ "fill": "none", "stroke": "black", "shape-rendering": "crispEdges", "opacity": "0.2" })
	// 	.attr("transform", "translate(0," + height + ")")
	// 	.call(x_grid());

	// Y grid
	svg.append("g")
		.style({
			"fill": "none",
			"stroke": "black",
			"shape-rendering": "crispEdges",
			"opacity": "0.2"
		})
		.attr("transform", "translate (" + margin.left + ", 0)")
		.call(y_grid());

	//Draw circles
	svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("r", function(d) {
			return(d['home'] === d['team1'] || d['home'] === d['team2']) ? 5 : 3;
		})
		.attr("fill", function(d) {
			return(d['home'] === d['team1'] || d['home'] === d['team2']) ? "rgb(255, 0, 0)" : "rgb(128, 128, 128)";
		})
		// Center X
		.attr("cx", function(d) {
			return x_time_scale(d["date"]);
		})
		// Center Y
		.attr("cy", function(d) {
			return y_count_scale(d["attendance"]);
		});

	// Build a legend
	var legend = svg.append("g")
		.attr("class", "legend")
		.attr("transform", "translate(" + (width - (margin.right * 5)) + "," + (margin.top - 30) + ")")
		.selectAll("g")
		.data([{ "name": "Home Team", "radius": 5 }, { "name": "Others", "radius": 3 }])
		.enter()
		.append("g");

	// legend cirle next to text
	legend.append("circle")
		.attr("cy", function(d, i) {
			return margin.top * i - legend_y_up;
		})
		.attr("cx", function(d) {
			return radius;
		})
		.attr("r", function(d) {
			return d.radius;
		})
		.attr("fill", function(d) {
			if(d.name === "Home Team") {
				return "rgb(255, 0, 0)";
			} else {
				return "rgb(128, 128, 128)";
			}
		})
		.attr("stroke", "none");

	// Legend text
	legend.append("text")
		.attr("y", function(d, i) {
			return margin.top * i;
		})
		.attr("x", function(d, i) {
			return radius * 3;
		})
		.text(function(d) {
			return d.name;
		})
		.style({
			"font-family": "sans-serif",
			"font-size": "10px",
			"fill": "black",
			"stroke": "none"
		});
};
