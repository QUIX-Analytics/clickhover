(function() {

	'use strict';

	angular
		.module('quix.layout')
		.controller('Quixtop', Quixtop
);

	function Quixtop($scope, $rootScope, dataService, userService ) {
		var vm = this;

		$rootScope.$on('$stateChangeSuccess', renderQuixtop);
		vm.dropMenu = dropMenu;
		vm.logout = logout;

		///////////////////////////////////////////


		function renderQuixtop(event, next) {
			dataService.getUser()
				.then(function(user) {
					vm.currentUser = user;
				});

			vm.title = next.name;
		}

		function logout(){
			userService.logout();
		}

		function dropMenu(){
			dataService.dropMenu();
		}
	}

})();
