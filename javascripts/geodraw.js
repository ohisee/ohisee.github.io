/*
 * This is to draw GEO data.
 */

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

var circle_style = {
	"fill": "rgba(247, 148, 32, 0.7)",
	"stroke": "black",
	"stroke-width": 0.7
};

/**
 * @param toolTip - tool tip div
 * @param d - data
 */
var toolTipHtmlOver = function(toolTip, d) {
	toolTip.transition()
		.duration(200)
		.style({ "opacity": 0.9 });
	toolTip.html("<span><b style='padding-right: 5px'>" +
			d.values["homeCountry"] +
			"</b></span><br/>" +
			"<span><b style='padding-right: 5px'>Attendance</b>" +
			d.values["attendance"] +
			"</span>")
		.style({
			"position": "absolute",
			"left": (d3.event.pageX) + "px",
			"top": (d3.event.pageY) + "px"
		});
};

/**
 * @param toolTip - tool tip div
 */
var toolTipHtmlOut = function(toolTip, d) {
	toolTip.transition()
		.duration(500)
		.style({ "opacity": 0 });
};

/**
 * Plot data on map
 * @param data - JSON response data
 * @param svg - svg element for drawing
 * @param projection - project function
 * @param toolTip = tool tip
 */
function plot_points(data, svg, projection, toolTip) {
	var nested = d3.nest()
		.key(function(d) {
			return d['date'].getUTCFullYear();
		})
		.rollup(function(leaves) {
			var total = d3.sum(leaves, function(d) {
				return d["attendance"];
			});

			var coords = leaves.map(function(d) {
				return projection([+d.long, +d.lat]);
			});

			var center_x = d3.mean(coords, function(d) {
				return d[0];
			});

			var center_y = d3.mean(coords, function(d) {
				return d[1];
			});

			var teams = d3.set();
			var homeCountry = d3.set();

			leaves.forEach(function(d) {
				teams.add(d["team1"]);
				teams.add(d["team2"]);
				homeCountry.add(d["home"]);
			});

			return {
				"attendance": total,
				"x": center_x,
				"y": center_y,
				"teams": teams.values(),
				"homeCountry": homeCountry.values()
			};
		})
		.entries(data);

	// Key function, extract key of nested
	var key_function = function(d) {
		return d["key"];
	};

	var attendance_max = d3.max(nested, function(d) {
		return d.values["attendance"];
	});

	var radius = d3.scale.sqrt()
		.domain([0, attendance_max])
		.range([0, 15]);

	var max_year = d3.max(nested, function(d) {
		return +d["key"];
	});

	var min_year = d3.min(nested, function(d) {
		return +d["key"];
	});

	svg.append("g")
		.attr("class", "bubble")
		.selectAll("circle")
		.data(nested.sort(function(a, b) {
			return b.values["attendance"] - a.values["attendance"];
		}), key_function)
		.enter()
		.append("circle")
		.attr("cx", function(d) {
			return d.values["x"];
		})
		.attr("cy", function(d) {
			return d.values["y"];
		})
		.attr("r", function(d) {
			return radius(d.values["attendance"]);
		})
		.attr("fill", "rgba(247, 148, 32, 0.7)")
		.attr("stroke", "black")
		.attr("stroke-width", 0.7)
		.on("mouseover", function(d) {
			toolTipHtmlOver(toolTip, d);
		})
		.on("mouseout", function(d) {
			toolTipHtmlOut(toolTip, d);
		});

	// Update year
	var update = function(year) {
		var filtered = nested.filter(function(d) {
			return new Date(d["key"]).getUTCFullYear() === year;
		});

		d3.select("span").text("World Cup Attendance of " + year);

		var circles = svg.selectAll("circle")
			.data(filtered, key_function);

		circles.exit().remove();

		circles.enter()
			.append("circle")
			.transition()
			.duration(500)
			.attr("cx", function(d) {
				return d.values["x"];
			})
			.attr("cy", function(d) {
				return d.values["y"];
			})
			.attr("r", function(d) {
				return radius(d.values["attendance"]);
			})
			.style(circle_style);

		circles.on("mouseover", function(d) {
				toolTipHtmlOver(toolTip, d);
			})
			.on("mouseout", function(d) {
				toolTipHtmlOut(toolTip, d);
			});

		var countries = filtered[0].values["teams"];

		var update_countries_path = function(d) {
			if(countries.indexOf(d.properties.name) !== -1) {
				return "rgb(0, 115, 153)"; //lightBlue
			} else {
				return "rgb(255, 255, 255)"; //white
			}
		};

		svg.selectAll("path")
			.transition()
			.duration(500)
			.style({
				"fill": update_countries_path,
				"stroke": update_countries_path
			});
	};

	d3.select("#link").on("click", function(d) {
		//Remove link
		d3.select(this).remove();
		//Start Animation
		var years = [];
		for(var i = min_year; i <= max_year; i = i + 4) {
			if(i !== 1942 && i !== 1946) {
				years.push(i);
			}
		}

		var year_idx = 0;
		var year_interval = setInterval(function() {
			update(years[year_idx]);
			year_idx++;
			if(year_idx >= years.length) {
				clearInterval(year_interval);

				var buttons = d3.select("body")
					.append("div")
					.attr("class", "years_buttons")
					.style({ "position": "fixed", "top": "5px", "left": "50px" })
					.selectAll("div")
					.data(years)
					.enter()
					.append("div")
					.text(function(d) {
						return d;
					})
					.style({
						"background-color": "rgb(251, 201, 127)",
						"font-family": "Arial, Helvetica, sans-serif",
						"font-size": "small",
						"padding": "3px",
						"margin": "7px"
					});

				buttons.on("click", function(d) {
					d3.select(".years_buttons")
						.selectAll("div")
						.style({
							"background": "rgb(251, 201, 127)",
							"color": "rgb(0, 0, 0)"
						});
					d3.select(this)
						.transition()
						.duration(500)
						.style({
							"background": "rgb(0, 115, 153)",
							"color": "rgb(255, 255, 255)"
						});
					update(d);
				});
			}
		}, 1000);
	});
};

/**
 * Draw geo map.
 * @param geo_data geo data
 */
function drawGeoData(geo_data) {
	"use strict";
	var margin = { "top": 20, "right": 30, "bottom": 30, "left": 40 };
	var width = 1200 - margin.left - margin.right;
	var height = 800 - margin.top - margin.bottom;

	var div = d3.select("#information")
		.style({ "margin": "10px" })
		.append("span")
		.text("World Cup Attendance")
		.style({
			"font-family": "Arial, Helvetica, sans-serif",
			"padding-left": "2.8cm",
			"font-size": "x-large"
		});

	var link = d3.select("#information")
		.append("a")
		.attr("id", "link")
		.attr("href", "#")
		.text("Start")
		.style({
			"font-family": "Arial, Helvetica, sans-serif",
			"font-size": "small",
			"padding-left": "20px"
		});

	var svg = d3.select("#content")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("class", "map");

	var projection = d3.geo.mercator()
		.scale(140)
		.translate([width / 2, height / 2]);

	var path = d3.geo.path().projection(projection);

	var map = svg.selectAll("path")
		.data(geo_data.features)
		.enter()
		.append("path")
		.attr("d", path)
		.style({
			"fill": "rgb(9, 157, 217)",
			"stroke": "black",
			"stroke-width": 0.5
		});

	var toolTip = d3.select("body")
		.append("div")
		.attr("class", "toolTip")
		.style({
			"opacity": 0,
			"padding": "2px",
			"pointer-events": "none",
			"background": "rgb(255, 255, 230)",
			"font-family": "Arial, Helvetica, sans-serif",
			"font-size": "12px",
			"border": "2px solid rgb(242, 242, 242)"
		});

	d3.tsv("data/world_cup_geo.tsv", transformType, function(data) {
		plot_points(data, svg, projection, toolTip)
	});
};
