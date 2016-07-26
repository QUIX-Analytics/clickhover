(function() {

	'use strict';

	angular
		.module('quix.layout')
		.factory('layoutService', layoutService);

	function layoutService($http) {
		var vm = this;
		var currentUser;

		return {
			getUser: getUser
		}

		////////////////////////////////////////////////

		function getUser() {
      return $http({
        method: 'GET',
        url: '/auth/me'
      }).then(function(response) {
        return response;
      });
    }

	}

})();
