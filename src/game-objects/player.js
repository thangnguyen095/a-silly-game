var Sprite = require('./sprite');
var KeyboardInput = require('./KeyboardInput');

module.exports = function(){
	Sprite.call(this); // inherit from sprite

	var input = new KeyboardInput();
	var veloX = 5;
	var veloY = 5;
	var faceRight = true;

	this.init = function init(){
		input.addKey('w', 87); // up
		input.addKey('a', 65);  // left
		input.addKey('s', 83); // down
		input.addKey('d', 68); // right
	}

	this.isCollising = function isCollising(obj){

	}

	this.handleCollise = function handleCollise(obj){

	}

	this.update = function update(){
		if(faceRight){
			console.log('right');
			console.log(input.getKeyState('d'));
			if(input.getKeyState('d') == 'down'){
				this.posX += veloX;
				console.log(this.posX);
			}else if(input.getKeyState('a') == 'down'){
				faceRight = false;
			}else{
				console.log('no key pressed');
			}
		}else{ // face left
			console.log('left');
			if(input.getKeyState('a') == 'down'){
				this.posX -= veloX;
			}else if(input.getKeyState('d') == 'down'){
				faceRight = true;
			}else{
				console.log('no key pressed');				
			}
		}
	}
}
