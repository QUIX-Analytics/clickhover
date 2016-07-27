(function() {

	'use strict';

	angular
		.module('quix.user')
		.controller('Register', Register);

	function Register($scope, $state, userService) {
		var vm = this;

		vm.register = function(user) {
			userService.register(user)
			.then(
				function success(response) {
					console.log(registerUser);
					if(response.status === 200) {
						$state.go('newsite');
					}
				},
				function error(response) {
					// handle error
					console.log(response);
				}
			);
		}

	}
})();
