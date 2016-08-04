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
			// console.log(site)
			site.owner = vm.user._id;
			site.URL = site.URL.toLowerCase()
			siteService.addSite(site)
				.then(function (response) {
					vm.getUser()
						.then(function (user) {
							dataService.refreshSessionUser(user);
						})
					var addSite = response.data._id;
					var mySite = {
						id: addSite
					};
					$state.go('^.settings', mySite);
				}
			)
		}

		vm.deleteSite = function (id) {
			siteService.deleteSite(id).then(function (response) {
				$state.go('profile')
				// vm.data = response.data;
			})
		}

		vm.updateSite = function (updatedSite) {
			var id = $stateParams.id
			// console.log(id);
			siteService.updateSite(updatedSite, id).then(function (response) {
				vm.data = response.data;
			})

		}

		// Quixstory

		vm.reverse = true;
		vm.numLimit = 20;

		vm.propertyName = 'createdAt';

		vm.sort = function() {
			vm.reverse = (vm.propertyName === propertyName) ? !vm.reverse : false;
		}

		vm.sortBy = function(propertyName) {
			vm.reverse = (vm.propertyName === propertyName) ? !vm.reverse : false;
			vm.propertyName = propertyName;
		};


	}


})()
