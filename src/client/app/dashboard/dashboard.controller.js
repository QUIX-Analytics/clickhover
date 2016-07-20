(function() {

  'use strict';
  angular
    .module('quix.dashboard')
    .controller('DashboardController', DashboardController)

  function DashboardController($scope, dashboardService) {

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
