(function() {

  'use strict';

  angular
    .module('quix.auth')
    .controller('AuthController', AuthController);

  function AuthController($scope, authService, $state) {
    var vm = this;
    vm.login = function(user) {
      authService.login(user).then(function(response) {
        console.log(response);
      })
    }

    vm.register = function(newUser) {
      authService.register(newUser).then(function(response) {
        console.log(response);
        alert('Account Successfully Created')
        $state.go('dashboard');
      })
    }

  }


})();
