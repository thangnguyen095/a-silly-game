/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Animator = __webpack_require__(4);
module.exports = function(){
	this.animator = new Animator();
	this.posX;
	this.posY;
	this.width;
	this.height;

	this.draw = function draw(ctx){
		this.animator.draw(ctx, this.posX, this.posY, this.width, this.height);
	}
}

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Player = __webpack_require__(3);
var Ground = __webpack_require__(8);
var Sprite = __webpack_require__(0);

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
		test.height = 71;
		test.posX = 0;
		test.posY = 0;
		test.init();

		objects.movable.push(test);
		for(var i = 0; i < 10; i++){
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
					item.handleCollision(objects.immovable[i]);
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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var Sprite = __webpack_require__(0);
var KeyboardInput = __webpack_require__(5);

module.exports = function(){
	Sprite.call(this); // inherit from sprite

	var input = new KeyboardInput();
	var veloX = 5;
	var veloY = 5;
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
		for(var i = 1; i <= 16; i++){
			var img = new Image();
			img.src = '/images/Idle ('+i+').png';
			idle.push(img);
		}
		for(var i = 1; i <= 13; i++){
			var img = new Image();
			img.src = '/images/Walk ('+i+').png';
			walk.push(img);
		}
		for(var i = 1; i <= 16; i++){
			var img = new Image();
			img.src = '/images/Jump ('+i+').png';
			jump.push(img);
		}
		this.animator.addState('idle', 50, true);
		this.animator.addImages('idle', idle);
		this.animator.addState('walk', 50, true);
		this.animator.addImages('walk', walk);
		this.animator.addState('jump', 50, false);
		this.animator.addImages('jump', jump);
	}

	this.isCollising = function isCollising(obj){
		return (this.posX < (obj.posX + obj.width) && (this.posX + this.width) > obj.posX && this.posY < (obj.posY + obj.height) && (this.posY + this.height) > obj.posY);
	}

	this.handleCollision = function handleCollision(obj){
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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(){
	var activeState = null;
	var states = new Array();
	var __i = 0;
	var lastDraw = new Date().getTime();
	var flipped = false;

	this.draw = function draw(ctx, x, y, w, h){
		if(activeState != null)
		{
			var now = new Date().getTime();
			if(states[activeState].speed != -1 && (now - lastDraw) >= states[activeState].speed){
				lastDraw = now;
				nextImage();
			}
			var img = states[activeState].images[__i];
			if(!flipped){
				ctx.drawImage(img, x, y, w, h);
			}
			else{
				drawFlipped(ctx, img, x, y, w, h);
			}
		}
	}

	function drawFlipped(ctx, img, x, y, w, h){
		ctx.translate(x+w, y);
		ctx.scale(-1, 1);
		ctx.drawImage(img, 0, 0, w, h);
		ctx.setTransform(1, 0, 0, 1, 0, 0);
	}

	this.flip = function flip(){
		flipped = !flipped;
	}

	function nextImage(){
		if(states[activeState].loop){
			__i = ++__i%(states[activeState].images.length);
		}else{
			__i++;
			__i = Math.min(__i, states[activeState].images.length-1);
		}

	}

	this.changeState = function changeState(str){
		if(states[activeState].name == str)
			return;
		for(var i = 0; i < states.length; i++){
			if(str == states[i].name)
			{
				activeState = i;
				__i = 0;
				lastDraw = new Date().getTime();
				return true;
			}
		}
		return false;
	}

	this.addState = function addState(name, speed, loop){
		var state = {name: name, speed: speed, images: new Array(), loop: loop}
		states.push(state);
		if(activeState == null)
		{
			activeState = 0;
		}
	}

	this.addImage = function addImage(name, img){
		states.forEach(function(item){
			if(item.name == name){
				item.images.push(img);
				return;
			}
		});
	}

	this.addImages = function addImages(name, images){

		states.forEach(function(item){
			if(item.name == name){
				item.images = images;
				return;
			}
		});
	}
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function(){
	var keys = new Array();

	this.addKey = function addKey(name, code){
		var key = {
			name: name,
			code: code,
			state: null
		}
		keys.push(key);
	}

	this.getKeyState = function getKeyState(name){
		for(var i = 0; i < keys.length; i++){
			if(keys[i].name == name){
				return keys[i].state;
			}
		}
		return null;
	}

	function onKeyDown(e){
		var code = e.which || e.keyCode;
		for(var i = 0; i < keys.length; i++){
			if(keys[i].code == code)
			{
				keys[i].state = 'down';
			}
		}
	}

	function onKeyUp(e){
		var code = e.which || e.keyCode;
		for(var i = 0; i < keys.length; i++){
			if(keys[i].code == code)
				keys[i].state = null;
		}
	}

	function onKeyPress(e){

	}

	window.addEventListener('keydown', onKeyDown);
	window.addEventListener('keyup', onKeyUp);
	window.addEventListener('keypress', onKeyPress);
}

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var Sprite = __webpack_require__(0);

module.exports = function(){
	Sprite.call(this);

	this.init = function(){
		var img = new Image();
		img.src = '/images/2.png'
		this.animator.addState('idle', 1000, false);
		this.animator.addImage('idle', img);
	}
}

/***/ })
/******/ ]);