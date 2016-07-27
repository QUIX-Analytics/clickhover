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
			var allowedStates = ['login', 'register'];
			if(allowedStates.indexOf(next.name) === -1) {
				dataService.getUser()
					.then(function(response) {
						if(!response) {
							$state.go('login');
						}
					});
			}
		}

	}

})();
