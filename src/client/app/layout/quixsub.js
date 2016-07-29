(function() {

	'use strict';

	angular
		.module('quix.layout')
		.controller('Quixsub', Quixsub);

	function Quixsub($stateParams, dataService) {
		var vm = this;
		vm.id = $stateParams.id

		//Temp SideNav Animation Here
		vm.sideNav = sideNav;

		/////////////////////////////////////

		function sideNav(){
			dataService.sideNav();
		}


	}

})();
