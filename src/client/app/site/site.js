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
			// console.log(site.URL);
			siteService.addSite(site)
				.then(function(response) {
					// site = {};
					console.log(site);
					// $state.go('site.my');
					// $stateParams = site._id
				})
		}

	}

})()
