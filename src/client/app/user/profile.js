(function() {

	angular
    .module('quix.user')
    .controller('Profile', Profile);

	function Profile($state, $timeout, userService, profileUser) {

		var vm = this;
		var currentUser = profileUser.data;

		// Check to see if there is a user in session
		if(currentUser === 'current user not defined') {
			$state.go('login');
    }

		vm.updatedUser = {};
		vm.updatedUser.username = currentUser.username;
		vm.updatedUser.email = currentUser.email;
		vm.updateUser = updateUser;
		vm.alertUsername = false;

		function updateUser(updatedUser) {
			vm.alertUsername = false;
			if(updatedUser.username.length < 4) {
				vm.alertUsername = 'Your username is too short (4 character minimum).';
				vm.updatedUser.username = currentUser.username;
				vm.updatedUser.email = currentUser.email;
				return;
			}
			if(updatedUser.username.length > 20) {
				vm.alertUsername = 'Your username is too long (20 character maximum).';
				vm.updatedUser.username = currentUser.username;
				vm.updatedUser.email = currentUser.email;
				return;
			}

			userService.updateUser(updatedUser, currentUser._id);
		}

	}

})();
