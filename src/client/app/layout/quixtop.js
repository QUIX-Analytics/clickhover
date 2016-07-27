(function() {

	'use strict';

	angular
		.module('quix.layout')
		.controller('Quixtop', Quixtop
);

	function Quixtop($scope, $rootScope, dataService) {
		var vm = this;

		$rootScope.$on('$stateChangeSuccess', renderQuixtop);
		$('.topbar-user').on('click', profileMenu);
		///////////////////////////////////////////

		function renderQuixtop(event, next) {
			dataService.getUser()
				.then(function(user) {
					vm.currentUser = user;
				});
				
			vm.title = next.name;
		}

	}

})();
