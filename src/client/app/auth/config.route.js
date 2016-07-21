(function() {
    'use strict';

    angular
        .module('quix.auth')
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
                    templateUrl: '/app/auth/login.html',
                    controller: 'Auth',
                    controllerAs: 'Auth',
                }
            },

            {
                state: 'register',
                config: {
                    url: '/register',
                    templateUrl: '/app/auth/register.html',
                    controller: 'Auth',
                    controllerAs: 'Auth',
                }
            }

        ];
    }
})();
