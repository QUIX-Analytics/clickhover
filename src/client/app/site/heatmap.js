(function() {

  'use strict';
  angular
    .module('quix.site')
    .controller('Heatmap', Heatmap)

  function Heatmap($scope, siteService) {

        var vm = this;
        vm.getSite = function() {
          siteService.getSite().then(function(response) {
            console.log(response);
            vm.data = response.data;
          })
        }
        vm.getSite();
        vm.maxScrollY = 0;

        vm.runTest = function(){
          console.log("SUH");
        }

        vm.filterDataToStateClicks = function() {
          var states = []; //States on this site for which clicks have been reported
          // console.log(vm.data);
          for(var i = 0; i < vm.data[0].sessions.length; i++){ //Loop through site sessions
            if(vm.data[0].sessions[i].platform === 'desktop'){ //Only report clicks from desktop sessions
              for(var j = 0; j < vm.data[0].sessions[i].clicks.length; j++){ //Loop through clicks in each session
                var existsAtIndex = stateIsInArray(vm.data[0].sessions[i].clicks[j].currentState) //Checks if a click's state is already in our array of states
                if(vm.data[0].sessions[i].clicks[j].scrollY > vm.maxScrollY) vm.maxScrollY = vm.data[0].sessions[i].clicks[j].scrollY;
                if(existsAtIndex !== 'false'){
                  states[existsAtIndex].clicks.push(vm.data[0].sessions[i].clicks[j]); //Adds to existing state's click array
                  states[existsAtIndex].clicks[states[existsAtIndex].clicks.length - 1].vw = vm.data[0].sessions[i].vw;
                  states[existsAtIndex].clicks[states[existsAtIndex].clicks.length - 1].vh = vm.data[0].sessions[i].vh;
                } else {
                  states.push({
                    stateName: vm.data[0].sessions[i].clicks[j].currentState, //Creates new state in states array and adds the click to that state
                    clicks: []
                  })
                  states[states.length - 1].clicks.push(vm.data[0].sessions[i].clicks[j])
                  states[states.length - 1].clicks[states[states.length - 1].clicks.length - 1].vw = vm.data[0].sessions[i].vw;
                  states[states.length - 1].clicks[states[states.length - 1].clicks.length - 1].vh = vm.data[0].sessions[i].vh;
                }
              }
            }
          }
          vm.heatmapData = states;
          console.log(states);
          addClickDivs();

          function stateIsInArray(stateName){
            for(var i = 0; i < states.length; i++){
              if(states[i].stateName === stateName) {
                return i;
              }
            }
            return 'false';
          }
        }
        // vm.getScreenshot = function() {
        //   $http.get('http://api.screenshotlayer.com/api/capture?access_key=c4a026b5c93f53a28c7044950c834865&url=http%3A%2F%2Ftheallenbros.com%2F%23%2F&fullpage=1&secret_key=6a05059e39e81967bdcf5e82d457a81d')
        //   .then(function(result){
        //     console.log(result);
        //     vm.image = result;
        //   }, function(error){
        //     console.log(error);
        //   })
        // }
        // vm.getScreenshot();
        function addClickDivs(){
          console.log('YOOOOO');
          var clickHolderElement = document.getElementById('click-holder');
          for(var i = 0; i < vm.heatmapData[0].clicks.length; i++){
            var clickDot = document.createElement("DIV");
            clickDot.style.height = "20px";
            clickDot.style.width = "20px";
            clickDot.style.background = "red";
            clickDot.style.borderRadius = "50%";
            clickDot.style.opacity = "1";
            clickDot.style.position = "absolute";
            clickDot.style.top = (vm.heatmapData[0].clicks[i].clickY / vm.heatmapData[0].clicks[i].vh) * 600 + vm.heatmapData[0].clicks[i].scrollY * .6 + "px";
            clickDot.style.left = (vm.heatmapData[0].clicks[i].clickX / vm.heatmapData[0].clicks[i].vw) * 900 + "px";
            clickHolderElement.appendChild(clickDot);
          }
        }
      }

})()
