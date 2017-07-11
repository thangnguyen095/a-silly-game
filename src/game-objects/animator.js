module.exports = function(){
	var activeState = null;
	var states = new Array();
	var __i;
	var lastDraw = new Date().getTime();

	function draw(ctx){
		if(activeState)
		{
			var now = new Date().getTime();
			if(states[activeState].speed != -1 && (now - lastDraw) >= states[activeState].speed){
				lastDraw = now;
				nextImage();
			}
			ctx.drawImage(states[activeState].images[__i]);
		}
	}

	function nextImage(){
		__i = ++__i%(states[activeState].images.length);
	}

	function changeState(str){
		for(int i = 0; i < states.length; i++){
			if(str == states[i].name)
			{
				activeState = i;
				__i = 0;
				lastDraw = new Date().getTime();
				return;
			}
		}
	}

	function addState(name, speed){
		var state = {name: name, speed: speed, images: null}
		states.push(state);
	}

	function addImage(name, img){
		states.forEach(function(item){
			if(item.name == name){
				item.images.push(img);
				return;
			}
		});
	}

	function addImages(name, images){

		states.forEach(function(item){
			if(item.name == name){
				item.images = images;
				return;
			}
		});
	}
}