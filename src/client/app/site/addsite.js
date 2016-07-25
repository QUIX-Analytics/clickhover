(function() {

  'use strict';
  angular
    .module('quix.site')
    .controller('AddSite', AddSite)

  function AddSite($scope, siteService) {

    var vm = this;

    vm.newSite = function(site) {

      site.URL = site.URL.toLowerCase()
      console.log(site);
      siteService.addSite(site).then(function(response) {
        site = {};
        console.log(site);
        alert('Success!');
        $state.go('dashboard');
      })
    }


  }

})()
