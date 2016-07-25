(function() {

  'use strict';
  angular
    .module('quix.site')
    .controller('AddSite', AddSite)

  function AddSite($scope, $state, siteService) {

    var vm = this;

    vm.newSite = function(site) {

      site.URL = site.URL.toLowerCase()
      console.log(site.URL);
      siteService.addSite(site).then(function(response) {
        site = {};
        alert('Success!');
        $state.go('dashboard');
      })
    }


  }

})()
