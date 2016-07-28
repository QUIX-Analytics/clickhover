(function() {

	'use strict';

	angular
		.module('quix.layout')
		.controller('Quixnav', Quixnav);

	function Quixnav($scope, $rootScope, dataService) {
		var vm = this;

		$rootScope.$on('$stateChangeSuccess', getSites);

		////////////////////////////////////////////////////////////////////////

		function getSites() {
			dataService.getUser()
				.then(function(user) {
					console.log(user);
					vm.sites = user.sites;
				});
		}

	}

})();
