(function() {

  'use strict';
  angular
    .module('quix.site')
    .controller('Dashboard', Dashboard)

  function Dashboard($scope, siteService) {

    var vm = this;
		var currentSiteId = siteService.getCurrentSiteId();
    getSite(currentSiteId, 30); // 30 day graph





		/*-----------------------------------------------------------------*\
			All general logic goes above this comment.
			All detailed logic(function definitions) goes below this comment.
		\*-----------------------------------------------------------------*/

    function getSite(id, time) { // id(String): site id, time(Number): time in days
      siteService.getSite(id)
				.then(function(response) {
	        var sessions = response.data.sessions;
	        var graph = [];
	        for (var i = 0; i < sessions.length; i++) {
	          var date = Date.parse(sessions[i].createdAt);
	          var totalTime = Date.now() - 1000 * 60 * 60 * 24 * time;
	          if(date >= totalTime) {
	            var x = date;
	            var y = sessions[i].clicks.length;
	            graph.push({x: x, y: y});
	          }
	        }
	        lineGraph(graph);
	      })
    }

    function lineGraph(lineData) {

      var vis = d3.select('#visualisation'),
      WIDTH = 1000,
      HEIGHT = 500,
      MARGINS = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
      },
      xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(lineData, function(d) {
        return d.x;
      }), d3.max(lineData, function(d) {
        return d.x;
      })]),
      yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(lineData, function(d) {
        return d.y;
      }), d3.max(lineData, function(d) {
        return d.y;
      })]),
      xAxis = d3.svg.axis()
        .scale(xRange)
        .tickSize(5)
        .tickSubdivide(true),
      yAxis = d3.svg.axis()
        .scale(yRange)
        .tickSize(5)
        .orient('left')
        .tickSubdivide(true);

  		vis.append('svg:g')
  		  .attr('class', 'x axis')
  		  .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
  		  .call(xAxis);

  		vis.append('svg:g')
  		  .attr('class', 'y axis')
  		  .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
  		  .call(yAxis);

  			var lineFunc = d3.svg.line()
  			  .x(function(d) {
  			    return xRange(d.x);
  			  })
  			  .y(function(d) {
  			    return yRange(d.y);
  			  })
  			  .interpolate('linear');

  			vis.append('svg:path')
  			  .attr('d', lineFunc(lineData))
  			  .attr('stroke', 'blue')
  			  .attr('stroke-width', 2)
  			  .attr('fill', 'none');

  			vm.today = moment().format('MM / DD');

    }

    function pieGraph{
      var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

var data = [
    { age: '<5', population: 2704659 },
   { age: '5-13', population: 4499890 },
    { age: '14-17', population: 2159981 },
    { age: '18-24', population: 3853788 },
    { age: '25-44', population: 14106543 },
    { age: '45-64', population: 8819342 },
    { age: '>65', population: 2612463},
    {age: '<100', population: 949840}
];

var color = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "#000"]);


var arc = d3.arc()
  .outerRadius(radius - 10)
  .innerRadius(radius - 120);

var labelArc = d3.arc()
    .outerRadius(radius - 50)
    .innerRadius(radius - 50)

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.population});

var svg = d3.select('body').append('svg')
    .attr('height', height)
    .attr('width', width)
  .append('g')
    .attr('transform', 'translate(' +width/2+ ',' + height/2+')');

var g = svg.selectAll('.arc')
    .data(pie(data))
  .enter().append('g')
    .attr('class', 'arc');


    g.append('path')
        .attr('d', arc)
        .attr('fill', function(d) {return color(d.data.age)});

    g.append('text')
      .text(function(d){ return d.data.age})
      .attr('transform', function(d){
    return 'translate('+labelArc.centroid(d)+')'
  });
    }
  }


})()
