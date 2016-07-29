(function () {

	'use strict';
	angular
		.module('quix.site')
		.controller('Site', Site)

	function Site($scope, $state, $stateParams, siteService, dataService) {

		var vm = this;
		getSite($stateParams.id);
		getUser();

		function getSite(id) {
			siteService.getSite(id).then(function (response) {
				vm.data = response.data;
			})
		}

		function getUser() {
			dataService.getUser().then(function (response) {
				vm.user = response;
			})
		}


		vm.newSite = function (site) {
			site.URL = site.URL.toLowerCase()
			siteService.addSite(site)
				.then(function (response) {
					// console.log(vm.user._id)
					vm.getUser()
						.then(function (user) {
							dataService.refreshSessionUser(user);
						})
					vm.mySite = response.data._id;
					// console.log(vm.mySite);
				})
		}

		vm.deleteSite = function (id) {
			// console.log("site.js delete site");
			siteService.deleteSite(id).then(function (response) {
				vm.data = response.data;
				// console.log(vm.data);
			})
		}
	}

})()
