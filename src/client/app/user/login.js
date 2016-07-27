(function() {

	angular
    .module('quix.user')
    .controller('Login', Login);

	function Login($state, $rootScope, dataService, userService) {
		var vm = this;

		console.log(dataService.currentUser);

		$rootScope.$on('$stateChangeSuccess', function() {
			if(dataService.currentUser) {
				$state.go('profile');
			}
		})

		vm.login = function(user) {
			userService.login(user);
		};

	}

})();
