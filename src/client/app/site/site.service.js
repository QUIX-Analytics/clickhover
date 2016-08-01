(function() {

  angular
    .module('quix.site')
    .factory('siteService', siteService)

  function siteService($http, $q) {

		var currentSite,
				currentSiteId;

		return {
			getSite: getSite,
			deleteSite: deleteSite,
			addSite: addSite,
			getCurrentSite: getCurrentSite // Should only be used by subnav controller
		}





		/*-----------------------------------------------------------------*\
			All general logic goes above this comment.
			All detailed logic(function definitions) goes below this comment.
		\*-----------------------------------------------------------------*/

    function getSite(id) {
			if(currentSite && id === currentSiteId) {
				return $q.when(currentSite)
			}

			return $http({
        method: 'GET',
        url: '/api/site/' + id
      }).then(function(response) {
					currentSite = response;
					currentSiteId = id;
          return currentSite;
      	});
    }

		function getCurrentSite() {
			return currentSite;
		}

    function deleteSite(id) {
      // console.log("site service deleteSite")
      return $http({
        method: 'DELETE',
        url: '/api/site/' + id
      }).then(function(response) {
          return response;
      });
    }

    function addSite(site) {
      return $http({
        method: 'POST',
        url: '/api/site',
        data: site
      }).then(function(response) {
        // console.log(response.data._id);
        return response;
      }, function(err) {
        console.log(err);
      });
    }

  }
})()
