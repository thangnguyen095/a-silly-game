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
/* 0 */,
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Player = __webpack_require__(3);
var Ground = __webpack_require__(8);
var Sprite = __webpack_require__(1);

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
		var player = new Player();
		player.width = 80;
		player.height = 110;
		player.posX = 0;
		player.posY = 0;
		player.init();
		objects.movable.push(player);

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

var Sprite = __webpack_require__(1);
var KeyboardInput = __webpack_require__(5);
var path = __webpack_require__(6);

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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var Sprite = __webpack_require__(1);

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