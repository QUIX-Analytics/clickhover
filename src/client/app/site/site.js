(function() {

  'use strict';
  angular
    .module('quix.site')
    .controller('Site', Site)

  function Site($scope, siteService) {

    var vm = this;
    vm.getSite = function() {
      siteService.getSite().then(function(response) {
        // console.log(response.data);
        vm.data = response.data;
      })
    }
    vm.getSite();


  }

})()
