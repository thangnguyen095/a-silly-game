var Sprite = require('./sprite');
var KeyboardInput = require('./KeyboardInput');
var path = require('path');

module.exports = function(){
	Sprite.call(this); // inherit from sprite

	var input = new KeyboardInput();
	var veloX = 5;
	var veloY = 10;
	var faceRight = true;
	var jumping = false;
	var jumpHeight = 150;
	var jumpForce = 0;
	var weight = 0.5;

	this.init = function init(){
		input.addKey('w', 87); // up
		input.addKey('a', 65);  // left
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
		imgIdle.src = '/images/adventurer_idle.png';
		idle.push(imgIdle);
		var imgJump = new Image();
		imgJump.src = '/images/adventurer_jump.png';
		jump.push(imgJump);
		var imgWalk1 = new Image();
		imgWalk1.src = '/images/adventurer_walk1.png';
		walk.push(imgWalk1);
		var imgWalk2 = new Image();
		imgWalk2.src = '/images/adventurer_walk2.png';
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
		// need to be modified
		if((this.posY + this.height) > obj.posY){
			jumping = false;
			veloY = 5;
			this.posY = obj.posY - this.height;
			console.log('below');
		}
		// if(this.posY < (obj.posY + obj.height)){
		// 	this.posY = obj.posY + obj.height;
		// 	console.log('above');
		// }
		// if((this.posX + this.width) > obj.posX){
		// 	this.posX = obj.posX - this.width;
		// 	console.log('right');
		// }
		// if(this.posX < (obj.posX + obj.width)){
		// 	this.posX = obj.posX + obj.width;
		// 	console.log('left');
		// }
	}

	this.update = function update(){
		// X movement
		if(faceRight){
			if(input.getKeyState('d') == 'down'){
				this.posX += veloX;
				if(!jumping)
					this.animator.changeState('walk');
			}else if(input.getKeyState('a') == 'down'){
				faceRight = false;
				this.animator.flip();
			}else{
				if(!jumping)
					this.animator.changeState('idle');
			}
		}else{ // face left
			if(input.getKeyState('a') == 'down'){
				this.posX -= veloX;
				if(!jumping)
					this.animator.changeState('walk');
			}else if(input.getKeyState('d') == 'down'){
				faceRight = true;
				this.animator.flip();
			}else{
				if(!jumping)
					this.animator.changeState('idle');
			}
		}

		// Y movement
		if(input.getKeyState('w') == 'down' && !jumping){
			jumpForce = jumpHeight;
			jumping = true;
			this.animator.changeState('jump');
		}
		if(jumpForce != 0){
			jumpForce -= veloY;
			this.posY -= veloY;
			veloY += weight;
			if(jumpForce <= 0){
				jumpForce = 0;
				veloY = 5;
			}
		}else{
			this.posY += veloY;
			veloY += weight;
		}
	}
}
