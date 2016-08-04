(function () {

	'use strict';
	angular
		.module('quix.site')
		.controller('Dashboard', Dashboard)

	function Dashboard($scope, siteService, $stateParams) {

		var vm = this;
		// var currentSiteId = siteService.getCurrentSiteId();
		getSite(30); // 30 day graph
		siteStats();

		/*-----------------------------------------------------------------*\
		  Moment.JS
		\*-----------------------------------------------------------------*/

		vm.today = moment().format('MM/DD');
		vm.now = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");;

		/*-----------------------------------------------------------------*\
			All general logic goes above this comment.
			All detailed logic(function definitions) goes below this comment.
		\*-----------------------------------------------------------------*/

		function bucketSort(array) {
			let buckets = [];
			for (var i = 0; i <= 100; i++) {
				buckets.push(0);
			}

			for (var i = 0; i < array.length; i++) {
				let number = array[i];
				buckets[number]++;
			}

			let arrayIndex = 0;
			for (var number = 0; number <= 100; number++) {
				let count = buckets[number];
				for (var i = 0; i < count; i++) {
					array[arrayIndex] = number;
					arrayIndex++;
				}
			}
		}

		function onlyUnique(value, index, self) {
			return self.indexOf(value) === index;
		}

		function siteStats() {
			// console.log("Site Stats")
			siteService.getSite($stateParams.id)
				.then(function (site) {
					var sesh = site.sessions
					var clicks = site.sessions.clicks
					vm.sessionCount = sesh.length
					var users = [];
					//  console.log(clicks)
					for (var i = 0; i < sesh.length; i++) {
						users.push(sesh[i].qu);
						// clicks.push(sesh[i].)
						// console.log(clicks)
					}
          var uniqueUsers = users.filter(onlyUnique);
          vm.userCount = uniqueUsers.length
					// console.log(vm.userCount)
				})
		}

		function getSite(time) { // id(String): site id, time(Number): time in days
			siteService.getSite($stateParams.id)
				.then(function (response) {
					var sessions = response.sessions;
					var graph = [];
					for (var i = 0; i < sessions.length; i++) {
						var date = Date.parse(sessions[i].createdAt);
						date = new Date(date);
						var totalTime = Date.now() - 1000 * 60 * 60 * 24 * time;
						if (date >= totalTime) {
							var x = date;
							var y = sessions[i].clicks.length;
							graph.push({
								x: x,
								y: y
							});
						}
					}
					lineGraphClicks(graph);

					var graph = [];
					for (var i = 0; i < sessions.length; i++) {
						var a = false;
						var date = Date.parse(sessions[i].createdAt);
						date = Math.floor(date / 86400000)
						for (var j = 0; j < graph.length; j++) {
							if (graph[j].x === date) {
								a = true;
								graph[j].y += 1;
							}
						}
						if (!a) {
							graph.push({
								x: date,
								y: 1
							})
						}
					}
					// console.log(graph);
					lineGraphSessions(graph);
				})
		}

		function lineGraphClicks(lineData) {

			var vis = d3.select('#visualisation'),
				WIDTH = 500,
				HEIGHT = 250,
				MARGINS = {
					top: 20,
					right: 20,
					bottom: 20,
					left: 50
				},
				xRange = d3.time.scale().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(lineData, function (d) {
					return d.x;
				}), d3.max(lineData, function (d) {
					return d.x;
				})]),
				yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(lineData, function (d) {
					return d.y;
				}), d3.max(lineData, function (d) {
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
				.x(function (d) {
					return xRange(d.x);
				})
				.y(function (d) {
					return yRange(d.y);
				})
				.interpolate('linear');

			vis.append('svg:path')
				.attr('d', lineFunc(lineData))
				.attr('stroke', 'blue')
				.attr('stroke-width', 2)
				.attr('fill', 'none');

		}


		function lineGraphSessions(lineData) {

			var dateNow = Date.now() / 86400000;

			var vis = d3.select('#sessions'),
				WIDTH = 500,
				HEIGHT = 250,
				MARGINS = {
					top: 20,
					right: 20,
					bottom: 20,
					left: 50
				},
				xRange = d3.time.scale().range([MARGINS.left, WIDTH - MARGINS.right]).domain([dateNow - 30, dateNow]),
				yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(lineData, function (d) {
					return d.y;
				}), d3.max(lineData, function (d) {
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
				.x(function (d) {
					return xRange(d.x);
				})
				.y(function (d) {
					return yRange(d.y);
				})
				.interpolate('linear');

			vis.append('svg:path')
				.attr('d', lineFunc(lineData))
				.attr('stroke', 'blue')
				.attr('stroke-width', 2)
				.attr('fill', 'none');
		}

	}


})()
