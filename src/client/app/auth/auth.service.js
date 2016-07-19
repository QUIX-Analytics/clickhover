(function() {

    angular
        .module('quix.auth')
        .service('authService', authService)

    function authService($http) {

        this.login = function(user) {
            return $http({
                method: 'POST',
                url: '/login',
                data: user
            }).then(function(response) {
                console.log(response);
                return response;
            })
        }
        this.logout = function() {
            return $http({
                method: 'GET',
                url: '/logout'
            }).then(function(response) {
                return response;
            })
        }
        this.register = function(user) {
            return $http({
                method: 'POST',
                url: '/register',
                data: user
            }).then(function(response) {
                return response;
            })
        }
        this.getUser = function() {
            return $http({
                method: 'GET',
                url: '/me'
            }).then(function(response) {
                return response;
            })
        }


    }

})()
