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
		__i = ++__i%(states[activeState].images.length);
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

	this.addState = function addState(name, speed){
		var state = {name: name, speed: speed, images: null}
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