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
                state: 'site',
                config: {
                    abstract: true,
                    url: '/site',
                    template: '<ui-view/>'
                }
            },
            {
                state: 'site.add',
                config: {
                    url: '/add',
                    templateUrl: '/app/site/views/addsite.html',
                    controller: 'Site',
                    controllerAs: 'Site'
                }
            },
            {
                state: 'site.settings',
                config: {
                    url: '/:id',
                    templateUrl: '/app/site/views/site.html',
                    controller: 'Site',
                    controllerAs: 'Site'
                }
            },
            {
                state: 'site.dashboard',
                config: {
                    url: '/:id/dashboard',
                    templateUrl: '/app/site/views/dashboard.html',
                    controller: 'Dashboard',
                    controllerAs: 'Dashboard'
                }
            },
            {
                state: 'site.quixtory',
                config: {
                    url: '/:id/quixtory',
                    templateUrl: '/app/site/views/quixtory.html'
                    // controller: 'Quixtory',
                    // controllerAs: 'Quixtory'
                }
            },
            {
                state: 'site.heatmap',
                config: {
                    url: '/:id/heatmap',
                    templateUrl: '/app/site/views/heatmap.html',
                    controller: 'Heatmap',
                    controllerAs: 'Heatmap'
                }
            }
        ];
    }
})();
