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

      for(var i = 0; i < vm.data[0].sessions.length; i++){
        for(var j = 0; j < vm.data[0].sessions[i].clicks.length; j++){
          var existsAtIndex = stateIsInArray(vm.data[0].sessions[i].clicks[j].currentState)
          if(existsAtIndex){
            states[existsAtIndex].clicks.push(vm.data[0].sessions[i].clicks[j]);
          } else {
            states.push({
              stateName: vm.data[0].sessions[i].clicks[j].currentState,
              states[states.length - 1].clicks.push(vm.data[0].sessions[i].clicks[j]);
            })
          }

        }
      }

      console.log(states);

      function stateIsInArray(stateName){
        for(var i = 0; i < states.length; i++){
          if(states[i].stateName === stateName) return i;
        }
        return false;
      }
    }
    vm.filterDataToStateClicks();

  }

})()
