(function() {

  'use strict';

  angular
    .module('quix.auth')
    .controller('AuthController', AuthController);

  function AuthController($scope) {
    this.name = 'Taylor'
  }

})();
