var Player = require('./game-objects/player');
var Ground = require('./game-objects/ground');
var Sprite = require('./game-objects/sprite');

(function(){
	var canvas = document.getElementById('game');
	var width = canvas.width;
	var height = canvas.height;
	var ctx = canvas.getContext('2d');
	var objects = { // 3 layers
		background: new Array(),
		movable: new Array(),
		immovable: new Array(), // interactive objects
		foreground: new Array()
	}

	function init(){
		var bg = new Sprite();
		var img = new Image();
		img.src = '/images/BG.png';
		bg.animator.addState('idle', 1000, false);
		bg.animator.addImage('idle', img);
		bg.posX = 0;
		bg.posY = 0;
		bg.width = 1000;
		bg.height = 750;
		objects.background.push(bg);
		var test = new Player();
		test.width = 100;
		test.height = 120;
		test.posX = 0;
		test.posY = 0;
		test.init();

		objects.movable.push(test);
		for(var i = 0; i < 5; i++){

			var gr = new Ground();
			gr.width = 100;
			gr.height = 100;
			gr.posX = 0 + i*100;
			gr.posY = 400;
			gr.init();

			objects.immovable.push(gr);
		}
	}

	init();

	function main(){
		// clear canvas
		ctx.clearRect(0, 0, width, height);
		// handle interactive objects
		objects.movable.forEach(function(item){
			item.update();
			for(var i = 0; i < objects.immovable.length; i++){
				if(item.isCollising(objects.immovable[i])){
					item.handleCollise(objects.immovable[i]);
				}
			}
		});


		// draw all background objects
		objects.background.forEach(function(item){
			item.draw(ctx);
		});
		// draw all playground objects
		objects.movable.forEach(function(item){
			item.draw(ctx);
		});
		objects.immovable.forEach(function(item){
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