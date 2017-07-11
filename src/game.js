
(function(){
	var canvas = document.getElementById('game');
	var width = canvas.width;
	var height = canvas.height;
	var ctx = canvas.getContext('2d');
	var objects = { // 3 layers
		background: new Array(),
		playground: new Array(), // interactive objects
		foreground: new Array()
	}

	function main(){
		// clear canvas
		ctx.clearRect(0, 0, width, height);
		// handle interactive objects
		// objects.playground.forEach(function(item){
		// 	item.update();
		// 	objects.playground.forEach(function(item2){
		// 		if(item2 !== item)
		// 		{
		// 			if(item.isCollising(item2);)
		// 				item.handleCollise(item2);
		// 		}
		// 	});
		// });


		// draw all background objects
		objects.background.forEach(function(item){
			item.draw(ctx);
		});
		// draw all playground objects
		objects.playground.forEach(function(item){
			item.draw(ctx);
		});
		// draw all foreground objects
		objects.foreground.forEach(function(item){
			item.draw(ctx);
		});
	}

	window.requestAnimationFrame(main);

})();