(function() {

  angular
    .module('quix.site')
    .service('siteService', siteService)

  function siteService($http) {
    this.getData = function() {
      return $http({
        method: 'GET',
        url: '/api/site'
        // need to GET /api/site/:id
      }).then(function(response) {
          return response;
      })
    }
  }

})()
