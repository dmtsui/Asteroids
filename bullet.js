function Bullet(game){
  this.game = game;
  this.radius= 3;
  this.velocity = this.calcVelocity();
  this.center = this.calcCenter(30);
  this.color = "red";

} 

Bullet.prototype = Object.create(Projectile.prototype);

Bullet.prototype.calcVelocity = function() {
var r = 15;
var velocity = [];
  velocity.push(r * Math.cos((game.ship.direction-90)* Math.PI/180));
  velocity.push(r * Math.sin((game.ship.direction-90)* Math.PI/180));
return velocity;
}

Bullet.prototype.calcCenter = function(r) {

var center = [];
  center.push(r * Math.cos((game.ship.direction-90)* Math.PI/180) + this.game.ship.center[0]);
  center.push(r * Math.sin((game.ship.direction-90)* Math.PI/180) + this.game.ship.center[1]);
return center;
}


Bullet.prototype.adjustBounds = function() {
    if ((this.center[0] < -this.radius) || (this.center[0] - this.game.canSize[0] > this.radius) ||
		(this.center[1] < -this.radius) || (this.center[1] - this.game.canSize[1] > this.radius)
		)
        this.destroyed = true;
}

Bullet.prototype.collision = function(){
  for(var i = 0, n = this.game.asteroids.length; i < n; i++){
	  var asteroid = this.game.asteroids[i];
	  if((this.radius + asteroid.radius) >= this.calcDist(asteroid)){
  	  	this.destroyed = true;
  		asteroid.destroyed = true;
		if (asteroid.radius/2 > 15){
			this.game.asteroids.push(new Asteroid(this.game, asteroid.center.slice(0), asteroid.radius/2));
			this.game.asteroids.push(new Asteroid(this.game, asteroid.center.slice(0), asteroid.radius/2));
		}

	  }
  }	  
}

Bullet.prototype.calcDist = function(asteroid){  
  return Math.sqrt(Math.pow(this.center[0] - asteroid.center[0], 2) +
  				   Math.pow(this.center[1] - asteroid.center[1],2));
}
