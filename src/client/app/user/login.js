(function() {

	angular
    .module('quix.user')
    .controller('Login', Login);

	function Login(userService, $state, currentUser) {
		var vm = this;

		if(currentUser) {
			$state.go('profile');
    }

		vm.login = function(user) {
			userService.login(user)
		}

	}

})();
