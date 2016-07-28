(function () {

	'use strict';
	angular
		.module('quix.site')
		.controller('Site', Site)

	function Site($scope, $state, $stateParams, siteService, dataService) {

		var vm = this;
		vm.getSite = function (id) {
			siteService.getSite(id).then(function (response) {
				vm.data = response.data;
			})
		}
		vm.getSite($stateParams.id);

		vm.getUser = function () {
			dataService.getUser().then(function (response) {
				vm.user = response;
			})
		}
		vm.getUser();


		vm.newSite = function (site) {
			site.URL = site.URL.toLowerCase()
			siteService.addSite(site)
				.then(function (response) {
					vm.mySite = response.data._id;
					console.log(vm.mySite);
					// $state.go('site.my', vm.mySite);
				})
		}

	}

})()
