(function() {

  'use strict';
  angular
    .module('quix.site')
    .controller('Heatmap', Heatmap)

  function Heatmap($scope, heatmapService) {

        var vm = this;
        var SITE = '';
        vm.getSite = function() {
          siteService.getSite().then(function(response) {
            // console.log(response);
            vm.data = response.data;
            for(var i = 0; i < vm.data.length; i++){
              if(vm.data[i].URL = "allenbros.com") SITE = vm.data[i];
            }
            filterDataToStateClicks();
          })
        }
        vm.getSite();

        vm.maxScrollY = 0;

        function filterDataToStateClicks() {
          var states = [];
          // console.log(vm.data);
          for(var i = 0; i < SITE.sessions.length; i++){
            if(SITE.sessions[i].platform === 'desktop'){
              for(var j = 0; j < SITE.sessions[i].clicks.length; j++){
                var existsAtIndex = stateIsInArray(SITE.sessions[i].clicks[j].currentState);
                if(SITE.sessions[i].clicks[j].scrollY > vm.maxScrollY) vm.maxScrollY = SITE.sessions[i].clicks[j].scrollY;
                if(existsAtIndex !== 'false'){
                  states[existsAtIndex].clicks.push(SITE.sessions[i].clicks[j]); //Adds to existing state's click array
                } else {
                  states.push({
                    stateName: SITE.sessions[i].clicks[j].currentState, //Creates new state in states array and adds the click to that state
                    clicks: []
                  })
                  states[states.length - 1].clicks.push(SITE.sessions[i].clicks[j])
                }
              }
            }
          }
          console.log(states);
          vm.clicksByStates = states;
          // vm.iframeState = vm.clicksByStates[0];
          // addClickDivs(0);




            function stateIsInArray(stateName){
              for(var i = 0; i < states.length; i++){
                if(states[i].stateName === stateName) {
                  return i;
                }
              }
              return 'false';
            }
        };

        vm.iframeLoadHandler = function(){
          setTimeout(function(){
            var iframe = document.getElementById("testframe");
              iframe.contentWindow.postMessage({scrollX: 0, scrollY: 100}, '*');
              // console.log("I DID IT");
              // console.log(iframe);
          }, 1000)
        };


        vm.heatmapScrollUp = function(distance) {
          var iframe = document.getElementById("testframe");
          var heatmapContainer = document.getElementById("heatmap-container");

          var heatmapScrollBefore = heatmapContainer.scrollTop;
          heatmapContainer.scrollTop = heatmapContainer.scrollTop - distance * .6;
          var heatmapScrollAfter = heatmapContainer.scrollTop;
          var scrollDifference = heatmapScrollBefore - heatmapScrollAfter;

          iframe.contentWindow.postMessage({direction: 'up', distance: scrollDifference / .6}, '*');
        }
        vm.heatmapScrollDown = function(distance) {
          var iframe = document.getElementById("testframe");
          var heatmapContainer = document.getElementById("heatmap-container");

          var heatmapScrollBefore = heatmapContainer.scrollTop;
          heatmapContainer.scrollTop = heatmapContainer.scrollTop + distance * .6;
          var heatmapScrollAfter = heatmapContainer.scrollTop;
          var scrollDifference = heatmapScrollAfter - heatmapScrollBefore;

          if(heatmapScrollBefore === heatmapScrollAfter) alert("No clicks registered beyond this point");

          iframe.contentWindow.postMessage({direction: 'down', distance: scrollDifference / .6}, '*');
        }

        vm.updateState = function(state){
          vm.iframeState = state;
          var iframe = document.getElementById("testframe").src = state.stateName;

          for(var i = 0; i < vm.clicksByStates.length; i++){
            if(vm.clicksByStates[i].stateName === state.stateName) addClickDivs(i);
          }
        }

        function addClickDivs(index){
          // console.log('YOOOOO');
          var clickHolderElement = document.getElementById('click-holder');
          while(clickHolderElement.firstChild){
            clickHolderElement.removeChild(clickHolderElement.firstChild);
          }
          for(var i = 0; i < vm.clicksByStates[index].clicks.length; i++){
            var clickDot = document.createElement("DIV");
            clickDot.style.height = "10px";
            clickDot.style.width = "10px";
            clickDot.style.background = "red";
            clickDot.style.borderRadius = "50%";
            clickDot.style.opacity = "1";
            clickDot.style.position = "absolute";
            clickDot.style.top = (vm.clicksByStates[index].clicks[i].clickY / vm.clicksByStates[index].clicks[i].vh) * 600.4 + vm.clicksByStates[index].clicks[i].scrollY * .6275 - 5 + "px";
            clickDot.style.left = (vm.clicksByStates[index].clicks[i].clickX / vm.clicksByStates[index].clicks[i].vw) * 900 - 5 + "px";
            clickHolderElement.appendChild(clickDot);
          }
        }
      }

})()
