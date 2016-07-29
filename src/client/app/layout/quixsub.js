(function() {

	'use strict';

	angular
		.module('quix.layout')
		.controller('Quixsub', Quixsub);

	function Quixsub(dataService) {
		var vm = this;
		//Temp SideNav Animation Here
		vm.sideNav = sideNav;

		/////////////////////////////////////

		function sideNav(){
			console.log("clicked it");
			dataService.sideNav();
		}


	}

})();
