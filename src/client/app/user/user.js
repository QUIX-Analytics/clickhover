(function() {

  'use strict';

  angular
    .module('quix.user')
    .controller('User', User);

  function User($scope, userService, $state, currentUser) {
    var vm = this;

    if(!currentUser) {
      $state.go('login');
    } else {
      console.log(currentUser);
    }

    vm.login = function(user) {
      user.email = user.email.toLowerCase();
      userService.login(user).then(function(response) {
      });
    }

    vm.register = function(newUser) {
      newUser.email = newUser.email.toLowerCase()
      userService.register(newUser).then(function(response) {
        newUser = {};
        alert('Success! Welcome to QUIX!');
        $state.go('login');
      })
    }

    vm.update = function(updatedUser) {
      userService.updateUser(updatedUser).then(function(response) {
        console.log(response.config.data);
        vm.user = response.config.data;
      })
    }

  }


})();
