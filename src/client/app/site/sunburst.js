(function() {

  'use strict';
  angular
    .module('quix.site')
    .controller('Sunburst', Sunburst)

  function Sunburst($scope, heatmapService) {

        var vm = this;
        var SITE = '';
        vm.getSite = function() {
          heatmapService.getSite().then(function(response) {
            SITE = response.data;
          })
        }
      }

})()
