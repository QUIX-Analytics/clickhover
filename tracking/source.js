(function(document, window) {

	var clicks = (function() {
		function onClick() {
			document.addEventListener('click', function(event) {
				console.log(event);
				// make a post request to the server
			});
		}

		return {
			onClick: onClick
		}
	})();

///////////////////HOVERS - (JORDAN)

  var hovers = (function(){

		var hoverInfo = {
			//site ID : site ID
			//page ID : page ID ?????
			viewHeight: window.innerHeight,
			viewWidth: window.innerWidth,
			hoverCoordinates: []
		};

		var hoverCoordinates = [];
		var prevEventTime = 0;

		document.addEventListener('mousemove', function(event){
			var duration = event.timeStamp - prevEventTime;
			prevEventTime = event.timeStamp;
			hoverCoordinates.push({
				x: event.clientX,
				y: event.clientY,
				duration: duration
			})
		})
    setInterval(function(){
			hoverInfo.hoverCoordinates = hoverCoordinates;
			console.log(hoverInfo.hoverCoordinates); //SEND OBJECT
			hoverInfo.hoverCoordinates = [];//clear object
			hoverCoordinates = [];
		}, 3000)
  })();

})(document, window);
