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
			dropMenu: dropMenu,
			sideNav: sideNav,
			refreshSessionUser: refreshSessionUser
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
					console.log(response);
					sessionStorage.setItem('quixUser', JSON.stringify(response.data));
					return response.data;
	    	});
			}
			else {
				return $q.when(currentUser);
			}
    }

		function refreshSessionUser(user) {

			sessionStorage.setItem('quixUser', JSON.stringify(user));

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

		function sideNav(){
			var subNav = document.getElementById('quixsub');
			var uiView = document.getElementById('ui-view');
			maxW = "15rem";
			if(subNav.style.width === maxW){
				subNav.style.width = "0px";
				uiView.style.marginLeft = "5.5rem";
			} else {
				subNav.style.width = maxW;
				uiView.style.marginLeft = "20.5rem";
			}
		}
	}


})();
