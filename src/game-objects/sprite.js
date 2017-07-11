var Animator = require('./animator');
module.exports = function(){
	var animator = new Animator();
	var posX, posY;
	var width, height;

	function draw(ctx){
		animator.draw(ctx);
	}

	function update(){

	}
}