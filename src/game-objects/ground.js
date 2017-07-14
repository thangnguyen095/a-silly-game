var Sprite = require('./sprite');

module.exports = function(){
	Sprite.call(this);

	this.init = function(){
		var img = new Image();
		img.src = require('../../images/2.png');
		this.animator.addState('idle', 1000, false);
		this.animator.addImage('idle', img);
	}
}