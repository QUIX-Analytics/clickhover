(function() {

  angular
    .module('quix.site')
    .service('siteService', siteService)

  function siteService($http, $state) {
    this.getSite = function() {
      return $http({
        method: 'GET',
        url: '/api/site'
        // need to GET /api/site/:id
      }).then(function(response) {
          return response;
      });
    }

    this.addSite = function(site) {
      return $http({
        method: 'POST',
        url: '/api/site',
        data: site
      }).then(function(response) {
        // console.log(site);
        return response;
      }, function(err) {
        console.log(err);
      });
    }

  }
})()
