(function() {

	angular
    .module('quix.user')
    .controller('Profile', Profile);

	function Profile(userService, $state, profileUser) {
		
		var vm = this;
		var currentUser = profileUser.data;

		// Check to see if there is a user in session
		if(currentUser === 'current user not defined') {
			$state.go('login');
    }

		vm.username = currentUser.username;

	}

})();
