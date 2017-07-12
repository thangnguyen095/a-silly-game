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