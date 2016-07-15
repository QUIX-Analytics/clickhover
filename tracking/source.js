(function(document) {

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

})(document);
