var Animator = require('./animator');
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