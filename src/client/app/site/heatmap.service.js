(function() {

  angular
    .module('quix.site')
    .service('heatmapService', heatmapService)

  function heatmapService($http, $state, $stateParams) {


    this.getSite = function() {
      return $http({
        method: 'GET',
        url: '/api/site/' + $stateParams.id
      }).then(function(response) {
        // console.log(response.data)
          return response;
      });
    }


  }
})()
