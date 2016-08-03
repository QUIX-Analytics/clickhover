(function() {

  angular
    .module('quix.site')
    .controller('Dashboard', function($scope){})
    .directive('pieChart', function(){
      function link(scope, el){
        d3.select(el[0]).append('svg')
        var width = 950,
        height = 500,
        textColor = #fff,
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
        var color = d3.scale.ordinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "#000"]);
        var arc = d3.svg.arc()
          .outerRadius(radius - 10)
          .innerRadius(radius - 120);
        var labelArc = d3.svg.arc()
            .outerRadius(radius - 50)
            .innerRadius(radius - 50)
        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) { return d.population});
        var svg = d3.select('body').append('svg')
            .attr('height', height)
            .attr('width', width)
            .attr('color', textColor)
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
      return{
        link:link,
        restrict: 'E'
      };
    });







		/*-----------------------------------------------------------------*\
			All general logic goes above this comment.
			All detailed logic(function definitions) goes below this comment.
		\*-----------------------------------------------------------------*/

})()
