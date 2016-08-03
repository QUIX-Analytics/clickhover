(function() {

  'use strict';
  angular
    .module('quix.site')
    .controller('Sunburst', Sunburst)

  function Sunburst($scope, $window, heatmapService) {

    var vm = this;
    var SITE = '';
    vm.getSite = function() {
      heatmapService.getSite().then(function(response) {
        SITE = response.data;
        filterToClickJourneys();
      })
    }
    vm.getSite();

    function filterToClickJourneys() {
      $window.clickJourneys = [];
      for(var i = 0; i < SITE.sessions.length; i++){
        var sessionJourney = [];
        var shortenedState = /[^/]*$/.exec(SITE.sessions[i].entryState)[0];
        if(!shortenedState) shortenedState = 'home';
        sessionJourney.push(shortenedState);
        for(var j = 0; j < SITE.sessions[i].clicks.length; j++){
          shortenedState = /[^/]*$/.exec(SITE.sessions[i].clicks[j].currentState)[0];
          if(!shortenedState) shortenedState = 'home';
          if(sessionJourney[sessionJourney.length - 1] !== shortenedState) {
            sessionJourney.push(shortenedState);
          }
          if(sessionJourney.length > 5) break;
        }
        sessionJourney.push('end');
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
      console.log($window.clickJourneys);
    }
  }



  //
  // var tempData = [
  //   ["home-product-product-product-search", 3],
  //   ["home-product-search-product-search", 6],
  //   ["home-search-product-product-search", 2],
  //   ["home-product-product-product-search", 2],
  //   ["home-product-product-search-search", 4],
  //   ["home-product-home-product-search", 9],
  //   ["product-product-home-product-search", 1],
  //   ["search-product-home-product-search", 4],
  //   ["product-product-home-product-search", 5],
  //   ["product-product-home-home-search", 6]
  // ];
})()
