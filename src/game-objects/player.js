var Sprite = require('./sprite');
var KeyboardInput = require('./KeyboardInput');
var path = require('path');

module.exports = function(){
	Sprite.call(this); // inherit from sprite

	var input = new KeyboardInput();
	var initVeloY = 10;
	var initVeloX = 5;
	var veloX = 0;
	var veloY = 0;
	var faceRight = true;
	var jumping = false;
	var grounded = false;
	// var jumpHeight = 150;
	var grav = 0.5;

	this.init = function init(){
		input.addKey('w', 87); // up
		input.addKey('a', 65); // left
		input.addKey('s', 83); // down
		input.addKey('d', 68); // right
		var idle = new Array();
		var walk = new Array();
		var jump = new Array();
		// old sprites
		// for(var i = 1; i <= 16; i++){
		// 	var img = new Image();
		// 	img.src = '/images/Idle ('+i+').png';
		// 	idle.push(img);
		// }
		// for(var i = 1; i <= 13; i++){
		// 	var img = new Image();
		// 	img.src = '/images/Walk ('+i+').png';
		// 	walk.push(img);
		// }
		// for(var i = 1; i <= 16; i++){
		// 	var img = new Image();
		// 	img.src = '/images/Jump ('+i+').png';
		// 	jump.push(img);
		// }
		// new sprite
		var imgIdle = new Image();
		imgIdle.src = require('../images/adventurer_idle.png');
		idle.push(imgIdle);
		var imgJump = new Image();
		imgJump.src = require('../images/adventurer_jump.png');
		jump.push(imgJump);
		var imgWalk1 = new Image();
		imgWalk1.src = require('../images/adventurer_walk1.png');
		walk.push(imgWalk1);
		var imgWalk2 = new Image();
		imgWalk2.src = require('../images/adventurer_walk2.png');
		walk.push(imgWalk2);
		this.animator.addState('idle', 50, true);
		this.animator.addImages('idle', idle);
		this.animator.addState('walk', 200, true);
		this.animator.addImages('walk', walk);
		this.animator.addState('jump', 50, false);
		this.animator.addImages('jump', jump);
	}

	this.isCollising = function isCollising(obj){
		return (this.posX < (obj.posX + obj.width) && (this.posX + this.width) > obj.posX && this.posY < (obj.posY + obj.height) && (this.posY + this.height) > obj.posY);
	}

	this.handleCollision = function handleCollision(obj){
		// temporary solution, need to be modified
		this.posY = obj.posY - this.height;
		veloY = 0;
		jumping = false;
		grounded = true;
	}

	this.update = function update(){
		// X movement
		if(input.getKeyState('d') == 'down'){
			if(!faceRight){
				faceRight = true;
				this.animator.flip();
			}
			veloX = initVeloX;
			if(!jumping)
				this.animator.changeState('walk');
		}else if(input.getKeyState('a') == 'down'){
			if(faceRight){
				faceRight = false;
				this.animator.flip();
			}
			veloX = -initVeloX;
			if(!jumping)
				this.animator.changeState('walk');
		} else {
			veloX = 0;
			if(!jumping)
				this.animator.changeState('idle');			
		}
		this.posX += veloX;

		// Y movement
		if(input.getKeyState('w') == 'down' && !jumping && grounded){
			veloY = -initVeloY;
			this.animator.changeState('jump');
			jumping = true;
		}
		this.posY += veloY;
		veloY += grav;
		grounded = false;
	}
}
