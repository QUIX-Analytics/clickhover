(function() {

	angular
    .module('quix.user')
    .controller('Profile', Profile);

	function Profile(userService, $state, profileUser) {
		var vm = this;
		console.log(profileUser);

		if(profileUser.data === 'current user not defined') {
			$state.go('login');
    }

	}

})();
