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

                state: 'auth',
                config: {
                    url: '/auth',
                    templateUrl: '/app/auth/auth.tmpl.html',
                    controller: 'AuthController',
                    controllerAs: 'authCtrl',
                }
            }
        ];
    }
})();
