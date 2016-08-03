(function() {

  'use strict';
  angular
    .module('quix.site')
    .controller('Behavior', Behavior)

  function Behavior($scope, $window, heatmapService) {

    var vm = this;
    var SITE = '';
    vm.getSiteSunBurst = function() {
      heatmapService.getSite().then(function(response) {
        SITE = response.data;
        filterToClickJourneys();
      })
    }
    vm.getSiteSunBurst();

    function filterToClickJourneys() {
      $window.clickJourneys = [];
      for(var i = 0; i < SITE.sessions.length; i++){
        var sessionJourney = [];
        var shortenedState = /[^/]*$/.exec(SITE.sessions[i].entryState)[0];
        if(!shortenedState) shortenedState = 'home';
        var longerThanMax = false;
        sessionJourney.push(shortenedState);
        for(var j = 0; j < SITE.sessions[i].clicks.length; j++){
          shortenedState = /[^/]*$/.exec(SITE.sessions[i].clicks[j].currentState)[0];
          if(!shortenedState) shortenedState = 'home';
          if(sessionJourney[sessionJourney.length - 1] !== shortenedState) {
            sessionJourney.push(shortenedState);
          }
          if(sessionJourney.length > 5) {
            longerThanMax = true;
            break;
          }
        }
        if(!longerThanMax) sessionJourney.push('end');
        var stringSessionJourney = sessionJourney.join('-');
        var found = false;
        for(var k = 0; k < $window.clickJourneys.length; k++){
          if(stringSessionJourney === $window.clickJourneys[k][0]) {
            $window.clickJourneys[k][1]++;
            found = true;
            break;
          }
        }
        if(!found){
          var newClickJourney = [stringSessionJourney, 1];
          $window.clickJourneys.push(newClickJourney);
        }
      }
    }
  }
})();
