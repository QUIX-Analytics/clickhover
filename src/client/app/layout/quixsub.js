(function() {

	'use strict';

	angular
		.module('quix.layout')
		.controller('Quixsub', Quixsub);

	function Quixsub($stateParams, $rootScope, dataService, siteService) {
		var vm = this;

		$rootScope.$on('$stateChangeSuccess', getCurrentSite);

		//Temp SideNav Animation Here
		sideNav();
		vm.sideNav = sideNav;
		vm.open = true;





		/*-----------------------------------------------------------------*\
			All general logic goes above this comment.
			All detailed logic(function definitions) goes below this comment.
		\*-----------------------------------------------------------------*/

		function getCurrentSite() {
			vm.open = true;
			sideNav();
			sideNav();
			if(siteService.getCurrentSite()) {
				vm.id = siteService.getCurrentSite()._id;
			}
		}

		function sideNav(){
			vm.open = dataService.sideNav(vm.open);
		}

	}

})();
