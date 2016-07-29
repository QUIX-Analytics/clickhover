(function() {

	angular
    .module('quix.user')
    .controller('Login', Login);

	function Login($state, $rootScope, dataService, userService) {
		var vm = this;

		vm.login = function(user) {
			userService.login(user)
				.then(function(user) {
					console.log(user)
					if(user.data === 'Unauthorized') {
						vm.wrongCredentials = true;
					} else {
						$state.go('profile');
					}
				});
		};

	}

})();
