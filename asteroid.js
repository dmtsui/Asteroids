function Asteroid(game, center, radius){
  this.game = game;
  this.radius= radius || rand(60,40);
  this.center = center || [rand(this.game.canSize[0]),
                 rand(this.game.canSize[1])];
  this.velocity = this.randomPos();
  this.color = "rgb("+rand(255)+","+rand(255)+","+rand(255)+")";

} 

Asteroid.prototype = Object.create(Projectile.prototype);

Asteroid.prototype.adjustBounds = function() {
  if (this.center[0] < -this.radius)
      this.center[0] = this.game.canSize[0] + this.radius;
  if (this.center[0] - this.game.canSize[0] > this.radius)
      this.center[0] = -1 * this.radius;
  if (this.center[1] - this.game.canSize[1] > this.radius)
      this.center[1] = -1 * this.radius;
  if (this.center[1] < -this.radius)
      this.center[1] = this.game.canSize[1] + this.radius;
}