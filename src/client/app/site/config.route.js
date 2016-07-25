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
                state: 'dashboard',
                config: {
                    url: '/site/' + _id + '/dashboard',
                    templateUrl: '/app/site/views/dashboard.html',
                    controller: '',
                    controllerAs: ''
                }
            },
            {
                state: 'quixtory',
                config: {
                    url: '/site/'+_id+'/quixtory',
                    templateUrl: '/app/site/views/quixtory.html',
                    controller: '',
                    controllerAs: ''
                }
            },
            {
                state: 'heatmap',
                config: {
                    url: '/site/' + _id + '/heatmap',
                    templateUrl: '/app/site/views/heatmap.html',
                    controller: '',
                    controllerAs: ''
                }
            }
        ];
    }
})();
