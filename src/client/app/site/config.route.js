(function() {
    'use strict';

    angular
        .module('quix.site')
        .run(appRun);

    // appRun.$inject = ['routerHelper']

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'newsite',
                config: {
                    url: '/site/',
                    templateUrl: '/app/site/views/newsite.html',
                    controller: 'New',
                    controllerAs: 'New'
                }
            },
            {
                state: 'dashboard',
                config: {
                    url: '/site/qxid/dashboard',
                    templateUrl: '/app/site/views/dashboard.html',
                    controller: 'Dashboard',
                    controllerAs: 'Dashboard'
                }
            },
            {
                state: 'quixtory',
                config: {
                    url: '/site/qxid/quixtory',
                    templateUrl: '/app/site/views/quixtory.html',
                    controller: 'Quixtory',
                    controllerAs: 'Quixtory'
                }
            }
            // {
            //     state: 'heatmap',
            //     config: {
            //         url: '/site/qxid/heatmap',
            //         templateUrl: '/app/site/views/heatmap.html',
            //         controller: 'Heatmap',
            //         controllerAs: 'Heatmap'
            //     }
            // }
        ];
    }
})();
