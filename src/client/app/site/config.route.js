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
                    controller: 'AddSite',
                    controllerAs: 'AddSite'
                }
            },
            {
                state: 'site.detail',
                config: {
                    url: '/:id',
                    templateUrl: '/app/site/views/site.html',
                    controller: 'Site',
                    controllerAs: 'Site'
                }
            },
            {
                state: 'detail.dashboard',
                config: {
                    url: '/dashboard',
                    templateUrl: '/app/site/views/dashboard.html'
                    // controller: 'Dashboard',
                    // controllerAs: 'Dashboard'
                }
            },
            {
                state: 'site.detail.quixtory',
                config: {
                    url: '/quixtory',
                    templateUrl: '/app/site/views/quixtory.html',
                    controller: 'Site',
                    controllerAs: 'Site'
                }
            },
            {
                state: 'site.detail.heatmap',
                config: {
                    url: '/heatmap',
                    templateUrl: '/app/site/views/heatmap.html',
                    controller: 'Heatmap',
                    controllerAs: 'Heatmap'
                }
            }
        ];
    }
})();
