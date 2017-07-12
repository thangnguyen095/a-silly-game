var Sprite = require('./sprite');
var KeyboardInput = require('./KeyboardInput');

module.exports = function(){
	Sprite.call(this); // inherit from sprite

	var input = new KeyboardInput();
	var veloX = 5;
	var veloY = 5;
	var faceRight = true;
	var jumping = false;
	var jumpHeight = 200;
	var jumpForce = 0;
	var weight = 0.2;

	this.init = function init(){
		input.addKey('w', 87); // up
		input.addKey('a', 65);  // left
		input.addKey('s', 83); // down
		input.addKey('d', 68); // right
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
		this.animator.addState('idle', 50, true);
		this.animator.addImages('idle', idle);
		this.animator.addState('walk', 50, true);
		this.animator.addImages('walk', walk);
	}

	this.isCollising = function isCollising(obj){
		return (this.posX < (obj.posX + obj.width) && (this.posX + this.width) > obj.posX && this.posY < (obj.posY + obj.height) && (this.posY + this.height) > obj.posY);
	}

	this.handleCollise = function handleCollise(obj){
		jumping = false;
		veloY = 5;
		this.posY = obj.posY - this.height;
	}

	this.update = function update(){
		// X movement
		if(faceRight){
			if(input.getKeyState('d') == 'down'){
				this.posX += veloX;
				this.animator.changeState('walk');
			}else if(input.getKeyState('a') == 'down'){
				faceRight = false;
				this.animator.flip();
			}else{
				this.animator.changeState('idle');
			}
		}else{ // face left
			if(input.getKeyState('a') == 'down'){
				this.posX -= veloX;
				this.animator.changeState('walk');
			}else if(input.getKeyState('d') == 'down'){
				faceRight = true;
				this.animator.flip();
			}else{
				this.animator.changeState('idle');
			}
		}

		// Y movement
		if(input.getKeyState('w') == 'down' && !jumping){
			jumpForce = jumpHeight;
			jumping = true;
		}
		if(jumpForce != 0){
			jumpForce -= veloY;
			this.posY -= veloY;
		}else{
			this.posY += veloY;
			veloY += weight;
		}
	}
}
