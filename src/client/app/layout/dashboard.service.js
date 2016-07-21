(function() {

  angular
    .module('quix.layout')
    .service('dashboardService', dashboardService)

  function dashboardService($http) {
    this.getData = function() {
      return $http({
        method: 'GET',
        url: '/api/site'
      }).then(function(response) {
          return response;
      })
    }
  }

})()
