(function () {


	angular.module('quix.core')
		.factory('dataService', dataService);

	function dataService($http, $q) {

    var currentUser = retrieveSession();

		var service = {
			getUser: getUser,
			refreshSessionUser: refreshSessionUser,

			//ANIMATIONS TEMP LIVE HERE
			dropMenu: dropMenu,
			addSiteNav: addSiteNav,
			sideNav: sideNav
		};

		return service;





		/*-----------------------------------------------------------------*\
			All general logic goes above this comment.
			All detailed logic(function definitions) goes below this comment.
		\*-----------------------------------------------------------------*/

		function retrieveSession() {
      return JSON.parse(sessionStorage.getItem('quixUser'));
    }

		function getUser() {
			if(currentUser) {
				return $q.when(currentUser);
			}
			else {
	      return $http({
	        method: 'GET',
	        url: '/auth/me'
	      }).then(function success(response) {
					sessionStorage.setItem('quixUser', JSON.stringify(response.data));
					return response.data;
	    	});
			}
    }

		function refreshSessionUser(user) {
			sessionStorage.setItem('quixUser', JSON.stringify(user));
		}

  	//ANIMATIONS NEED TO BE MOVED TO THEIR OWN SERVICE/FACTORY
		function dropMenu(){
			var menu = document.getElementById('profile-menu');
			maxH = '11rem';
			if (menu.style.height === maxH) {
				menu.style.height = '0px';
				menu.style.border = 'none';
			} else {
				menu.style.height = maxH;
			}
		}

		function sideNav(){
			var subNav = document.getElementsByTagName('quixsub')[0];
			var uiView = document.getElementsByTagName('ui-view')[0];
			var toggleBtn = document.getElementById('subnav-toggle');
			var arrowBtn = document.getElementById('subnav-arrow');
			var maxW = '15rem';
			var maxT = '15rem';

			if (subNav.style.width === maxW){
				subNav.style.width = '0';
				uiView.style.marginLeft = '5.5rem';
				toggleBtn.style.left = '0';
        arrowBtn.style.transform = 'rotate(180deg)';
			}
			else {
				subNav.style.width = maxW;
				uiView.style.marginLeft = '20.5rem';
				toggleBtn.style.left = maxT;
        arrowBtn.style.transform = 'rotate(0deg)';
			}
		}

		function addSiteNav(){
			var uiView = document.getElementsByTagName('ui-view')[0];
			var subNav = document.getElementsByTagName('quixsub')[0];
			var toggleBtn = document.getElementById('subnav-toggle');
			var arrowBtn = document.getElementById('subnav-arrow');
			if (uiView.style.marginLeft === '5.5rem'){
				uiView.style.marginLeft = '20.5rem';
				toggleBtn.style.left = '15rem';
				arrowBtn.style.transform = 'rotate(0deg)';
				subNav.style.width = '15rem';

			}
		}

	}


})();
