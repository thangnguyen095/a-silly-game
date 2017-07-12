module.exports = function(){
	var keys = new Array();

	this.addKey = function addKey(name, code){
		var key = {
			name: name,
			code: code,
			state: null
		}
		keys.push(key);
		console.log(keys);
	}

	this.getKeyState = function getKeyState(name){
		for(var i = 0; i < keys.length; i++){
			if(keys[i].name == name){
				console.log(keys[i].state);
				return keys[i].state;
			}
		}
		console.log('error');
		return null;
	}

	function onKeyDown(e){
		var code = e.which || e.keyCode;
		keys.forEach(function(item){
			if(code == item.code){
				item.state = 'down';
				console.log(item.state);
			}
		});
	}

	function onKeyUp(e){
		var code = e.which || e.keyCode;
		keys.forEach(function(item){
			if(code == item.code){
				item.state = null;
			}
		});
	}

	function onKeyPress(e){

	}

	window.addEventListener('keydown', onKeyDown);
	window.addEventListener('keydown', onKeyUp);
	window.addEventListener('keydown', onKeyPress);
}