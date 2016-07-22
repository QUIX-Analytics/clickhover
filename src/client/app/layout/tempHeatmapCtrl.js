(function() {

  'use strict';
  angular
    .module('quix.layout')
    .controller('Heatmap', Heatmap)

  function Heatmap($scope, dashboardService) {

    var vm = this;
    vm.getData = function() {
      dashboardService.getData().then(function(response) {
        console.log(response);
        vm.data = response.data;
      })
    }
    vm.getData();

    vm.filterDataToStateClicks = function() {
      var states = [];
      var exists = true;
      for(var i = 0; i < vm.data.sessions.length; i++){
        for(var t = 0; t < states.length; t++){
          if(states[t].stateName === )
        }
        for(var j = 0; j < vm.data.sessions[i].clicks.length; j++){

        }
      }
    }

  }

})()
