(function() {

    angular
        .module('quix.user')
        .service('userService', userService)

    function userService($http) {

        this.login = function(user) {
            return $http({
                method: 'POST',
                url: '/auth/login',
                data: user
            }).then(function(response) {
                
            })
        }
        this.logout = function() {
            return $http({
                method: 'GET',
                url: '/auth/logout'
            }).then(function(response) {
                return response;
            })
        }
        this.register = function(user) {
            return $http({
                method: 'POST',
                url: '/auth/register',
                data: user
            }).then(function(response) {
                return response;
            })
        }
        this.updateUser = function(updatedUser) {
          return $http({
            method: 'PUT',
            url: "/auth/:id",
            data: updatedUser
          }).then(function(response) {
            return response;
          });
        }
        this.getUser = function() {
            return $http({
                method: 'GET',
                url: '/auth/me'
            }).then(function(response) {
                return response;
            })
        }


    }

})()
