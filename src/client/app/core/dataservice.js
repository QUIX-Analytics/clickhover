(function() {

	angular.module('quix.core')
		.factory('dataService', dataService);

	function dataService($http) {

		var service = {
			getUser: getUser,
			currentUser: ''
		}

		return service;

		////////////////////////////////////////////////

		function getUser() {
      return $http({
        method: 'GET',
        url: '/auth/me'
      }).then(function success(response) {
				service.currentUser = response.data;
				return response.data;
    	});
    }

	}

})();
