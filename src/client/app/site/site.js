(function () {

	'use strict';
	angular
		.module('quix.site')
		.controller('Site', Site)

	function Site($scope, $state, siteService) {

		var vm = this;
		vm.getSite = function () {
			siteService.getSite().then(function (response) {
				// console.log(response.data);
				vm.data = response.data;
			})
		}
		vm.getSite();

		vm.newSite = function(site) {
			site.URL = site.URL.toLowerCase()
			siteService.addSite(site)
				.then(function(response) {
					vm.mySite = response.data._id;
					console.log(vm.mySite);
					// $state.go('site.my');
					// $stateParams = site._id
				})
		}

	}

})()
