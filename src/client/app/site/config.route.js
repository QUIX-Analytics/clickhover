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
                state: 'site.my',
                config: {
                    url: '/:id',
                    templateUrl: '/app/site/views/site.html',
                    controller: 'Site',
                    controllerAs: 'Site'
                }
            },
            {
                state: 'site.my.dashboard',
                config: {
                    url: '/site/:id/dashboard',
                    templateUrl: '/app/site/views/dashboard.html',
                    controller: 'Dashboard',
                    controllerAs: 'Dashboard'
                }
            },
            {
                state: 'quixtory',
                config: {
                    url: '/site/:id/quixtory',
                    templateUrl: '/app/site/views/quixtory.html'
                    // controller: 'Quixtory',
                    // controllerAs: 'Quixtory'
                }
            },
            {
                state: 'heatmap',
                config: {
                    url: '/site/:id/heatmap',
                    templateUrl: '/app/site/views/heatmap.html',
                    controller: 'Heatmap',
                    controllerAs: 'Heatmap'
                }
            }
        ];
    }
})();
