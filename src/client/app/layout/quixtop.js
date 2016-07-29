(function() {

	'use strict';

	angular
		.module('quix.layout')
		.controller('Quixtop', Quixtop);

	function Quixtop($scope, $state, $rootScope, dataService, userService) {
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
			userService.logout()
				.then(function(response) {
					dataService.dropMenu();
					$state.go('login');
				});
		}

		function dropMenu(){
			dataService.dropMenu();
		}
	}

})();
