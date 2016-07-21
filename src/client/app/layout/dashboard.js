(function() {

  'use strict';
  angular
    .module('quix.layout')
    .controller('Dashboard', Dashboard)

  function Dashboard($scope, dashboardService) {

    var vm = this;
    vm.getData = function() {
      dashboardService.getData().then(function(response) {
        console.log(response);
        vm.data = response.data;
      })
    }
    vm.getData();


  }

})()
