(function() {

  'use strict';
  angular
    .module('quix.site')
    .controller('Heatmap', Heatmap)

  function Heatmap($scope, siteService) {

    var vm = this;
    vm.getData = function() {
      siteService.getData().then(function(response) {
        console.log(response);
        vm.data = response.data;
      })
    }
    vm.getData();


  }

})()
