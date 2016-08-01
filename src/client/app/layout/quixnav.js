(function() {

	'use strict';

	angular
		.module('quix.layout')
		.controller('Quixnav', Quixnav);

	function Quixnav($scope, $state, $rootScope, dataService, siteService) {
		var vm = this;

		vm.currentUser = false;

		$rootScope.$on('$stateChangeSuccess', getSites);

		vm.goToSite = goToSite;





		/*-----------------------------------------------------------------*\
			All general logic goes above this comment.
			All detailed logic(function definitions) goes below this comment.
		\*-----------------------------------------------------------------*/

		function getSites() {
			dataService.getUser()
				.then(function(user) {
					vm.sites = user.sites;
					vm.currentUser = user;
				});
		}

		function goToSite(id) {
			siteService.getSite(id)
				.then(function(site) {
					$state.go('site.my', { id: id })
				});
		}

	}

})();
