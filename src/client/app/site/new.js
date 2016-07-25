(function() {

  'use strict';
  angular
    .module('quix.site')
    .controller('New', New)

  function New($scope, siteService) {

    var vm = this;

    vm.newSite = function(site) {
      console.log(site.URL);
      // site.URL = site.URL.toLowerCase()

      siteService.addSite(site).then(function(response) {
        site = {};
        console.log(site);
        alert('Success!');
        $state.go('dashboard');
      })
    }


  }

})()
