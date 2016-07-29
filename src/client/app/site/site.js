(function () {

	'use strict';
	angular
		.module('quix.site')
		.controller('Site', Site)

	function Site($scope, $state, $stateParams, siteService, dataService) {

		var vm = this;
		getSite($stateParams.id);


		function getSite(id) {
			siteService.getSite(id).then(function (response) {
				vm.data = response.data;
			})
		}

		vm.getUser = function () {
			return dataService.getUser().then(function (response) {
				vm.user = response;
			})
		}
		vm.getUser();

		vm.newSite = function (site) {
			console.log(site)
			site.owner = vm.user._id;
			site.URL = site.URL.toLowerCase()
			siteService.addSite(site)
				.then(function (response) {
					console.log(response.data)
					vm.getUser()
						.then(function (user) {
							dataService.refreshSessionUser(user);
						})
					vm.mySite = response.data._id;
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
