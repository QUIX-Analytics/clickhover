(function() {

  'use strict';

  angular
    .module('quix.auth')
    .controller('AuthController', AuthController);

  function AuthController($scope, authService) {
    var vm = this;
    vm.login = function(user) {
      console.log(user);
      authService.login(user).then(function(response) {
        console.log(response);
      })
    }
  }

})();
