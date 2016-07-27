(function() {

  angular
    .module('quix.site')
    .service('siteService', siteService)

  function siteService($http, $state, $stateParams) {
  

    this.getSite = function() {
      return $http({
        method: 'GET',
        url: '/api/site/' + $stateParams.id
      }).then(function(response) {
        // console.log(response.data)
          return response;
      });
    }

    this.addSite = function(site) {
      return $http({
        method: 'POST',
        url: '/api/site',
        data: site
      }).then(function(response) {
        // push 'response.data._id' to currentuser.sites[];
        // console.log(response.data._id);
        return response;
      }, function(err) {
        console.log(err);
      });
    }

  }
})()
