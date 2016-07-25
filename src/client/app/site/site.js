(function() {

  'use strict';
  angular
    .module('quix.site')
    .controller('Site', Site);

  function Site($scope, siteService) {

    var vm = this;

    vm.getData = function() {
      siteService.getData().then(function(response) {
        console.log(response);
        vm.data = response.data;
      })
    };
    // vm.getData();


  }

})()
