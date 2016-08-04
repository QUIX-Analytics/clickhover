(function() {

  angular
    .module('quix.site')
    .directive('pieChart', pieChart);

      function pieChart() {
        var directive = {
            link:link,
            // templateUrl: 'pieChart.html',
            restrict: 'EA'
        };
        return directive;

        function link(scope, el, attrs){
          d3.select(el[0]).append('svg')
          var width = (475*1.5),
          height = (250*1.5),
          outerRadius = 100,
          radius = Math.min(width, height) / 2;

          var data = [
              { browser: 'Chrome', population: 45 },
              { browser: 'Safari', population: 20 },
              { browser: 'FireFox', population: 15 },
              { browser: 'IE', population: 9 },
              { browser: 'Other', population: 13 }
          ];
          var color = d3.scale.ordinal()
              .range(["#F0991F","#437DCC", "#E62117", "#6b486b", "#09AA64"]);
          var arc = d3.svg.arc()
            .outerRadius(radius - 10)
            .innerRadius(radius - 100)
          var labelArc = d3.svg.arc()
              .outerRadius(radius - 60)
              .innerRadius(radius - 60)
          var pie = d3.layout.pie()
              .sort(null)
              .value(function(d) { return d.population})
          var svg = d3.select(el[0]).append('svg')
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
              .attr('stroke', "#212326")
              .attr('stroke-width', "4")
              .attr('fill', function(d) {return color(d.data.browser)});

          g.append('text')
            .text(function(d){
              return d.data.browser})
              .attr("text-anchor", "middle") //center the text on it's origin
              .style("fill", "White")
              .style("font", "14px")
              .attr('transform', function(d){
                d.outerRadius = outerRadius - 50;
                d.innerRadius = outerRadius - 45;
              return 'translate('+labelArc.centroid(d)+')'
            });
        }

    }







		/*-----------------------------------------------------------------*\
			All general logic goes above this comment.
			All detailed logic(function definitions) goes below this comment.
		\*-----------------------------------------------------------------*/

})()
