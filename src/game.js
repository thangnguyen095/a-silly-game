var Player = require('./game-objects/player');
var path = require('path');

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

	function init(){
		var test = new Player();
		var idle = new Array();
		var walk = new Array();
		for(var i = 1; i <= 15; i++){
			var img = new Image();
			img.src = '/images/Idle-' +i+ '.png';
			idle.push(img);
		}
		for(var i = 1; i <= 10; i++){
			var img = new Image();
			img.src = '/images/Walk ('+i+').png';
			walk.push(img);
		}
		test.animator.addState('idle', 50, true);
		test.animator.addImages('idle', idle);
		test.animator.addState('walk', 50, true);
		test.animator.addImages('walk', walk);
		test.width = 100;
		test.height = 120;
		test.posX = 0;
		test.posY = 0;
		test.init();

		objects.playground.push(test);
	}

	init();

	function main(){
		// clear canvas
		ctx.clearRect(0, 0, width, height);
		// handle interactive objects
		objects.playground.forEach(function(item){
			item.update();
			// objects.playground.forEach(function(item2){
			// 	if(item2 != item)
			// 	{
			// 		if(item.isCollising(item2);)
			// 			item.handleCollise(item2);
			// 	}
			// });
		});


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

		window.requestAnimationFrame(main);
	}

	window.requestAnimationFrame(main);

})();