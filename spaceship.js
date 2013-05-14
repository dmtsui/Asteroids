function SpaceShip(game){
  this.game = game;
  this.direction = 0;
  this.vel = [0, 0];
  this.center = [400,250];
  this.speed = 1;
  this.radius = 10;
  this.sSize = 30;

}

SpaceShip.prototype.draw = function(){
  this.game.ctx.save();
  this.adjustBounds();
  this.game.ctx.translate(this.center[0]+= this.vel[0], this.center[1] += this.vel[1]);
  this.game.ctx.rotate(this.direction * Math.PI/180);
  this.game.ctx.drawImage(spaceshipImage,-this.sSize ,-this.sSize , this.sSize *2, this.sSize *2);
  // this.game.ctx.fillStyle = "yellow";
 // 	this.game.ctx.beginPath();
 // 	this.game.ctx.moveTo(0, 0);
 // 	this.game.ctx.lineTo(-12, 15);
 // 	this.game.ctx.lineTo(0, - 18);
 // 	this.game.ctx.lineTo(12, 15);
 // 	this.game.ctx.lineTo(0, 0);
 // 	this.game.ctx.fill();
 // 	this.game.ctx.stroke();
 // 	this.game.ctx.closePath();
  this.game.ctx.restore();
}

SpaceShip.prototype.shoot = function() {
    this.game.bullets.push(new Bullet(this.game));
}

SpaceShip.prototype.accelerate = function(){

	this.vel[0] += this.speed * Math.cos((this.direction-90)* Math.PI/180);
	this.vel[1] += this.speed * Math.sin((this.direction-90)* Math.PI/180);
	if (this.vel[0] > 5) { this.vel[0] = 5; }
	if (this.vel[0] < -5) { this.vel[0] = -5; }
	if (this.vel[1] > 5) { this.vel[1] = 5; }
	if (this.vel[1] < -5) { this.vel[1] = -5; }	
}

SpaceShip.prototype.adjustBounds = function() {
	if (this.center[0] < -this.radius)
	  this.center[0] = this.game.canSize[0] + this.radius;
	if (this.center[0] - this.game.canSize[0] > this.radius)
	  this.center[0] = -1 * this.radius;
	if (this.center[1] - this.game.canSize[1] > this.radius)
	  this.center[1] = -1 * this.radius;
	if (this.center[1] < -this.radius)
	  this.center[1] = this.game.canSize[1] + this.radius;
}

SpaceShip.prototype.collision = function(asteroids, radius){
	asteroids = asteroids || this.game.asteroids;
	radius = radius || this.radius;
	for(var i = 0, n = asteroids.length; i < n; i++){
	  asteroid = asteroids[i];
	  if((radius + asteroid.radius) >= this.calcDist(asteroid))
	  	return true;
	}
	return false;		  
	}

SpaceShip.prototype.calcDist = function(asteroid){  
	return Math.sqrt(Math.pow(this.center[0] - asteroid.center[0], 2) +
				   Math.pow(this.center[1] - asteroid.center[1],2));
}


SpaceShip.prototype.input = function() {
    if (keyMap[38] === true){ this.accelerate(); }
	if (keyMap[37] === true){ this.direction -= 10; }
	if (keyMap[39] === true){ this.direction += 10; }
}
