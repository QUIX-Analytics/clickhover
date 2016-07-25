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
			userService.register(user);
		}
	}
})();
