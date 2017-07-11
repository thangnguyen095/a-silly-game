module.exports = function(){
	var keys = new Array();

	function addKey(name, code){
		var key = {
			name: name,
			code: code,
			state: null
		}
		keys.push(key);
	}

	function getKeyState(name){
		keys.forEach(function(item){
			if(item.name == name){
				return item.state;
			}
		});
		return null;
	}

	function onKeyDown(e){
		var code = e.which || e.keyCode;
		keys.forEach(function(item){
			if(code == item.code){
				item.state = 'down';
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