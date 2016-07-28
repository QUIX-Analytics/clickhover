(function () {

	angular.module('quix.core')
		.factory('dataService', dataService);

	function dataService($http, $q) {
		var currentUser;

		var service = {
			getUser: getUser
		}

		return service;

		////////////////////////////////////////////////

		function getUser() {
			if(!currentUser) {
	      return $http({
	        method: 'GET',
	        url: '/auth/me'
	      }).then(function(response) {
					currentUser = response.data;
					return currentUser;
	    	});
			}
			else {
				return $q.when(currentUser);
			}
    }

	}
})();
