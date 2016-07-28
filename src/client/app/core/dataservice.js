(function () {


	angular.module('quix.core')
		.factory('dataService', dataService);

	function dataService($http, $q) {
    function retrieveSession() {
      return JSON.parse(sessionStorage.getItem('quixUser'));
    }
    var currentUser = retrieveSession();

		var service = {
			getUser: getUser,
			//ANIMATIONS TEMP LIVE HERE
			dropMenu: dropMenu
		};

		return service;

		////////////////////////////////////////////////


		function getUser() {
      // var currentUser = JSON.parse(sessionStorage.getItem('quixUser'));
			if(!currentUser) {
        console.log('RETRIEVING USER');
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
