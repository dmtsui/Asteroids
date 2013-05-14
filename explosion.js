function Explosion(game, center){
	this.frame = 0;
	this.game = game;
	this.center = center;
	this.frameSize = 64;
	this.sourceSize = 320;
	this.factor = this.sourceSize / this.frameSize;
	this.frames = this.factor * this.factor;
	this.row = 0;
	this.col = 0;
	this.animationTime = 2000;
	this.callTime = this.animationTime /  frameRate;
	this.timeCounter = 0;
	this.C
	
}

Explosion.prototype.draw = function(){
	console.log([this.row * this.frameSize, this.col * this.frameSize]);
  this.game.ctx.drawImage(explosionImage,
	  					  this.col * this.frameSize, this.row * this.frameSize,
	  					  this.frameSize, this.frameSize,
  						  this.center[0]- this.frameSize / 2, this.center[1] - this.frameSize / 2, 
						  this.frameSize, this.frameSize
  );
  
  
  if (this.timeCounter === 0){
	    this.update();
  }	else {
	  this.timeCounter += frameRate;
  }
  if (this.timeCounter >= this.callTime) { this.timeCounter = 0; }					

}

Explosion.prototype.update = function (){
	if (this.frame > this.frames) { 
		this.destroyed = true; 
	} else {
		//console.log('frame: '+ this.frame);
		this.row = Math.floor( this.frame / this.factor );
		this.col = this.frame % this.factor;
		
	}
	this.frame++
}
