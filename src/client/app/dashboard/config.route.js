(function() {
    'use strict';

    angular
        .module('quix.dashboard')
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
                    templateUrl: '/app/dashboard/dashboard.tmpl.html',
                    controller: 'DashboardController',
                    controllerAs: 'dashboardCtrl',
                }
            }
        ];
    }
})();
