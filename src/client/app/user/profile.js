(function() {

	angular
    .module('quix.user')
    .controller('Profile', Profile);

	function Profile(userService, $state, profileUser) {

		var vm = this;
		var currentUser = profileUser.data;
		console.log(currentUser);

		// Check to see if there is a user in session
		if(currentUser === 'current user not defined') {
			$state.go('login');
    }

		vm.updatedUser = {};
		vm.updatedUser.username = currentUser.username;
		vm.updatedUser.email = currentUser.email;
		vm.updateUser = updateUser;

		function updateUser(updatedUser) {
			userService.updateUser(updatedUser, currentUser._id);
		}

	}

})();
