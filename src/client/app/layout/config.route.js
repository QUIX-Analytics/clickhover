(function() {
    'use strict';

    angular
        .module('quix.layout')
        .run(appRun);

    // appRun.$inject = ['routerHelper']

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {

                state: 'dashboard',
                config: {
                    url: '/dashboard',
                    templateUrl: '/app/layout/dashboard.html',
                    controller: 'Dashboard',
                    controllerAs: 'Dashboard',
                }
            }
        ];
    }
})();
