(function() {

	'use strict';

	angular
		.module('quix.layout')
		.controller('Quixsub', Quixsub);

	function Quixsub($stateParams, dataService) {
		var vm = this;
		vm.id = $stateParams.id;

		//Temp SideNav Animation Here
		vm.sideNav = sideNav;





		/*-----------------------------------------------------------------*\
			All general logic goes above this comment.
			All detailed logic(function definitions) goes below this comment.
		\*-----------------------------------------------------------------*/

		function sideNav(){
			dataService.sideNav();
		}

	}

})();
