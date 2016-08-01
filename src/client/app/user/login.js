(function() {

	angular
    .module('quix.user')
    .controller('Login', Login);

	function Login($state, $rootScope, dataService, userService) {
		var vm = this;

		vm.login = login;





		/*-----------------------------------------------------------------*\
			All general logic goes above this comment.
			All detailed logic(function definitions) goes below this comment.
		\*-----------------------------------------------------------------*/

		function login(user) {
			userService.login(user)
				.then(function(user) {
					if(user.data === 'Unauthorized') {
						vm.wrongCredentials = true;
					} else {
						$state.go('profile');
					}
				});
		}

	}

})();
