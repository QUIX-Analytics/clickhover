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
        // console.log('RETRIEVING USER');
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
			var subNav = document.getElementsByTagName("quixsub")[0];
			var uiView = document.getElementsByTagName("ui-view")[0];
			var toggleBtn = document.getElementById("nav-toggle");

			var maxW = "15rem";
			var maxT = "15.5rem";

			if (subNav.style.width === maxW){
				subNav.style.width = "0px";
				uiView.style.marginLeft = "5.5rem";
				toggleBtn.style.left = ".5rem";
        toggleBtn.style.transform = "rotate(0deg)";

			} else {
				subNav.style.width = maxW;
				uiView.style.marginLeft = "20.5rem";
				toggleBtn.style.left = maxT;
        toggleBtn.style.transform = "rotate(180deg)";
			}
		}
	}


})();
