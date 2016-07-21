(function() {

  'use strict';

  angular
    .module('quix.auth')
    .controller('Auth', Auth);

  function Auth($scope, authService, $state) {
    var vm = this;
    vm.login = function(user) {
      user.email = user.email.toLowerCase();
      authService.login(user).then(function(response) {
        console.log(response);
        user = {};
        $state.go('dashboard');
      })
    }

    vm.register = function(newUser) {
      newUser.email = newUser.email.toLowerCase()
      authService.register(newUser).then(function(response) {
        console.log(response);
        newUser = {};
        alert('Success! Welcome to QUIX!')
      })
    }

  }


})();
