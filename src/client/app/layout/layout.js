(function() {

	'use strict';

	angular
		.module('quix.layout')
		.controller('Layout', Layout);

	function Layout($scope, $rootScope, $state, dataService) {
		var vm = this;

		// when state changes, check to see if user exists in sessions. reroute if false
		$rootScope.$on('$stateChangeStart', getUser);

		////////////////////////////////////////////////////////////////////////

		function getUser(e, next) {
			var allowedStates = ['login', 'register', 'landingpage'];

			if(next.name !== 'landingpage') {

				dataService.getUser()
					.then(function(user) {
						vm.currentUser = user;

						/*--------------------------------------------------*\
						  Uncomment these if statements when ready to launch
						\*--------------------------------------------------*/
						// if(user && allowedStates.indexOf(next.name) > -1) {
						// 	$state.go('profile');
						// }
						// if(!user && next.name !== 'register') {
						// 	$state.go('login');
						// }

					});

			}
		}

	}

})();
