(function() {

	'use strict';

	angular
		.module('quix.layout')
		.controller('Quixnav', Quixnav);

	function Quixnav($scope, $state, $rootScope, dataService, siteService) {
		var vm = this;

		vm.currentUser = false;

		$rootScope.$on('$stateChangeSuccess', getSites);

		$rootScope.$on('$stateChangeSuccess', addSiteNav);
		// $rootScope.$on('$stateChangeSuccess', sideNav);

		vm.goToSite = goToSite;




		/*-----------------------------------------------------------------*\
			All general logic goes above this comment.
			All detailed logic(function definitions) goes below this comment.
		\*-----------------------------------------------------------------*/

		function getSites() {
			dataService.getUser()
				.then(function(user) {
					console.log(user);
					if(user) {
						var icons = ['space-shuttle', 'ship', 'motorcycle', 'fighter-jet', 'rocket', 'bus', 'bicycle', 'subway', 'truck']
						for (var i = 0; i < user.sites.length; i++) {
							user.sites[i].icon = icons[i];
						}
						vm.sites = user.sites;
						vm.currentUser = user;
					}
				});
		}

		function goToSite(id) {

			siteService.getSite(id)
				.then(function(site) {
					$state.go('site.settings', { id: id });
				});
		}
		function sideNav(){
			dataService.sideNav();
		}

		function addSiteNav(){
			dataService.addSiteNav();
		}
	}

})();
