(function () {

	angular.module('quix.core')
		.factory('dataService', dataService);

	function dataService($http, $q) {
		var currentUser;

		var service = {
			getUser: getUser,
			//ANIMATIONS TEMP LIVE HERE 
			dropMenu: dropMenu
		};

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

		function dropMenu(){
			var menu = document.getElementById('profile-menu');
			maxH = "20rem";
			if (menu.style.height === maxH) {
					menu.style.height = "0px";
					menu.style.border = "none";
			} else {
					menu.style.height = maxH;
					menu.style.borderBottom = "2px solid #E68D35";

			}
		}

	}


})();
