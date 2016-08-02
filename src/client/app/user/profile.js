(function() {

	angular
    .module('quix.user')
    .controller('Profile', Profile);

	function Profile($state, $timeout, dataService, userService) {

		var vm = this;
		var currentUser;
		vm.alertUsername = ''

		dataService.getUser()
			.then(function(user) {
				currentUser = user;

				vm.updatedUser = {};
				vm.updatedUser.username = currentUser.username;
				vm.updatedUser.email = currentUser.email;
				vm.updateUser = updateUser;
				vm.deleteUser = deleteUser;
			})





		/*-----------------------------------------------------------------*\
			All general logic goes above this comment.
			All detailed logic(function definitions) goes below this comment.
		\*-----------------------------------------------------------------*/

		function updateUser(updatedUser) {
			if(updatedUser.username.length < 4) {
				vm.alert = 'error';
				vm.alertUsername = 'Your username is too short (4 character minimum).';
				vm.updatedUser.username = currentUser.username;
				vm.updatedUser.email = currentUser.email;
				return;
			}
			if(updatedUser.username.length > 20) {
				vm.alert = 'error';
				vm.alertUsername = 'Your username is too long (20 character maximum).';
				vm.updatedUser.username = currentUser.username;
				vm.updatedUser.email = currentUser.email;
				return;
			}

			userService.updateUser(updatedUser, currentUser._id)
				.then(function(user) {
					dataService.refreshSessionUser(user);
					if(updatedUser.username !== currentUser.username) {
						vm.alert = 'success';
						vm.alertUsername = 'Successfully updated username';
					}
					if(updatedUser.email !== currentUser.email) {
						alert('Successfully updated user email');
					}
					$state.go($state.current, {}, {reload: true});
				});

		}

		function deleteUser(email) {
			if (currentUser.email !== email) {
				alert('You entered an incorrect email address.');
			}
			userService.deleteUser(currentUser._id)
				.then(function(response) {
					dataService.dropMenu();
					$state.go('register')
				});
		}

	}

})();
