function Projectile(game){
  this.game = game;
  this.radius= rand(60);
  this.center = [rand(this.game.canSize[0]),
                 rand(this.game.canSize[1])];
  this.velocity = this.randomPos();
  this.color = "rgb("+rand(255)+","+rand(255)+","+rand(255)+")";

}

Projectile.prototype.draw = function(){
  this.game.ctx.fillStyle = this.color;
  this.game.ctx.beginPath();
  this.game.ctx.arc(this.center[0], this.center[1],
                    this.radius, 0, 2 * Math.PI, false);
  this.game.ctx.fill();
  this.update();
}

Projectile.prototype.randomPos = function() {
  return [rand(2) * this.sign(), rand(2) * this.sign()];
}

Projectile.prototype.sign = function() {
  return (Math.random() < .5 ? 1 : -1);
}

Projectile.prototype.update = function() {
  this.center = [this.center[0] + this.velocity[0],
                 this.center[1] + this.velocity[1]];
  this.adjustBounds();
}
