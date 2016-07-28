(function () {


	angular.module('quix.core')
		.factory('dataService', dataService);

	function dataService($http, $q) {

		var service = {
			getUser: getUser,
		}

		return service;

		////////////////////////////////////////////////


		function getUser() {
      var currentUser = JSON.parse(sessionStorage.getItem('quixUser'));
			if(!currentUser) {
	      return $http({
	        method: 'GET',
	        url: '/auth/me'
	      }).then(function success(response) {
					sessionStorage.setItem('quixUser', JSON.stringify(response.data));
					return response.data;
	    	});
			}
			else {
				return $q.when(currentUser);
			}
    }

	}
})();
