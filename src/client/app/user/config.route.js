(function() {
  'use strict';

  angular
    .module('quix.user')
    .run(appRun);

  // appRun.$inject = ['routerHelper']

  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

	function currentUser($http) {
		return $http({
			method: 'GET',
			url: '/auth/me'
		}).then(function(response) {
			return response;
		});
	}

  function getStates() {
    return [
      {
        state: 'login',
        config: {
          url: '/',
          templateUrl: '/app/user/login.html',
          controller: 'Login',
          controllerAs: 'Login',
          resolve: {
            loginUser: currentUser
          }
        }
      },

      {
        state: 'register',
        config: {
          url: '/register',
          templateUrl: '/app/user/register.html',
          controller: 'Register',
          controllerAs: 'Register',
					resolve: {
            registerUser: currentUser
          }
        }
      },

      {
        state: 'profile',
        config: {
          url: '/profile',
          templateUrl: '/app/user/profile.html',
          controller: 'Profile',
          controllerAs: 'Profile',
          resolve: {
            profileUser: currentUser
          }
        }
      }

    ];
  }
})();
