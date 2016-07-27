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

  function getStates() {
    return [
      {
        state: 'login',
        config: {
          url: '/',
          templateUrl: '/app/user/login.html',
          controller: 'Login',
          controllerAs: 'Login'
        }
      },

      {
        state: 'register',
        config: {
          url: '/register',
          templateUrl: '/app/user/register.html',
          controller: 'Register',
          controllerAs: 'Register'
        }
      },

      {
        state: 'profile',
        config: {
          url: '/profile',
          templateUrl: '/app/user/profile.html',
          controller: 'Profile',
          controllerAs: 'Profile'
        }
      }

    ];
  }
})();
