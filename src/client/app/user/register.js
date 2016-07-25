(function() {

	'use strict';

	angular
		.module('quix.user')
		.controller('Register', Register);

	function Register($scope, $state, userService, registerUser) {
		var vm = this;

		if(registerUser.data !== 'current user not defined') {
			$state.go('profile');
    }

		vm.register = function(user) {
			userService.register(user)
			.then(function(response) {
				if(response.status === 200) {
					$state.go('profile');
				} else {
					// show error message
				}
			});
		}

	}
})();
