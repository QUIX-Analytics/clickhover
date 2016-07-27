(function() {

	angular
    .module('quix.user')
    .controller('Login', Login);

	function Login(userService, $state, loginUser) {
		var vm = this;

		if(loginUser.data !== 'current user not defined') {
			$state.go('profile');
    }

		vm.login = function(user) {
			userService.login(user)
		}

	}

})();
