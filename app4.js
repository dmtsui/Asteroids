var game;
var keyMap = {};
var rand = function(max, min) {
	var min = min || 0;
    return Math.floor(Math.random() * (max-min)+1) + min;
}
$(function(){ 
	
	game = new Game([800,500]);

	game.play = window.setInterval(function(){game.draw()},33);

	$("body").keydown(function(e) {
	keyMap[e.keyCode] = true;
	switch (e.keyCode){

	case 32:
	  game.ship.shoot();
	  break;
	case 81:
	  clearInterval(game.play);
	  break;
	case 87:
	  game.play = window.setInterval(function(){game.draw()},33);
	  break;
	default:
	  console.log(e.keyCode);
	  break;
	}
	});

	$("body").keyup(function(e){ keyMap[e.keyCode] = false; });

});


function Game(canSize) {
	
	this.canSize = canSize;
	this.ctx;
	this.canvas = document.getElementById('field');
	this.play;
	this.level = 1;
	this.baseAsteroid = 5;
	if (this.canvas.getContext){
		this.ctx = this.canvas.getContext('2d');
	}
	this.startTime = new Date();
	this.timerDisplay = $('#time');
	this.asteroids = [];
	this.bullets = [];
	this.ship = new SpaceShip(this);
	this.addAsteroids(5);
}

Game.prototype.calcTime = function(){
	var now = new Date();
	return (now.getTime() - this.startTime.getTime())/1000;
}

Game.prototype.draw = function(){
  this.ctx.clearRect(0,0,this.canSize[0],this.canSize[1]);
  this.ctx.fillStyle = "rgb(200,200,200)";
  this.ctx.fillRect(0,0,this.canSize[0],this.canSize[1]);
  this.asteroids.forEach(function(el){
    el.draw();
  });
  
  if (this.asteroids.length === 0){
	  this.level++;
	  this.addAsteroids(this.level + this.baseAsteroid);
  }
  
  this.timerDisplay.text(this.calcTime());
  
  var aL = this.asteroids.length;
  while(aL--){
	  this.asteroids[aL].destroyed ? this.asteroids.splice(aL,1) : this.asteroids[aL].draw();
  }
  
  
  var bL = this.bullets.length;
  while(bL--){
	  this.bullets[bL].collision();
	  this.bullets[bL].destroyed ? this.bullets.splice(bL,1) : this.bullets[bL].draw();
  }
  this.ship.input();
  this.ship.draw();
  this.gameOver();
}



Game.prototype.addAsteroids = function(num) {
  for(var i = 0; i < num; i++){
	var asteroid = new Asteroid(this);
	while(this.ship.collision([asteroid])){
		asteroid = new Asteroid(this);
	}
    this.asteroids.push(asteroid);
  }
}

Game.prototype.gameOver = function(){
  if (this.ship.collision()){
      alert("Game Over!");
      clearInterval(this.play);
  }
}