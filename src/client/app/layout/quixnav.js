(function() {

	'use strict';

	angular
		.module('quix.layout')
		.controller('Quixnav', Quixnav);

	function Quixnav($scope, $rootScope, dataService) {
		var vm = this;

		$rootScope.$on('$stateChangeSuccess', getSites);





		/*-----------------------------------------------------------------*\
			All general logic goes above this comment.
			All detailed logic(function definitions) goes below this comment.
		\*-----------------------------------------------------------------*/

		function getSites() {
			dataService.getUser()
				.then(function(user) {
					vm.sites = user.sites;
				});
		}

	}

})();
