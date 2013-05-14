var game;
var keyMap = {};
var rand = function(max, min) {
	var min = min || 0;
    return Math.floor(Math.random() * (max-min)+1) + min;
}

var stars = new Image();
stars.src = "img/stars.jpg";
var asteroidImage = new Image();
asteroidImage.src = 'img/asteroid.png';
var spaceshipImage = new Image();
spaceshipImage.src = 'img/spaceship.png';
var explosionImage = new Image();
explosionImage.src = 'img/explosion.png';

var frameRate = 25;

$(function(){ 
	
	game = new Game([900,600]);

	game.play = window.setInterval(function(){game.draw()}, frameRate);

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
	  game.play = window.setInterval(function(){game.draw()}, frameRate);
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
	this.scoreDisplay = $('#score');
	this.asteroids = [];
	this.bullets = [];
	this.explosions = [];
	this.ship = new SpaceShip(this);
	this.addAsteroids(5);
	this.countDown = 3;
	this.countDownTime = new Date();
	this.score = 0;
}

Game.prototype.levelCountDown = function(){
	if(this.countDown > 0){
		var milliseconds = this.calcTime(this.countDownTime);
		var text = this.countDown;
		this.ctx.fillStyle = "white";
		this.ctx.font = (24+ Math.floor( (milliseconds % 1)*30))+"pt Arial";	
		this.ctx.fillText(text, this.canSize[0]/2,this.canSize[1]/2);
		if (milliseconds > 1){
			this.countDown--
			this.countDownTime = new Date();	
		}
	}
}

Game.prototype.calcTime = function(time){
	time = time || this.startTime;
	var now = new Date();
	return (now.getTime() - time.getTime())/1000;
}


Game.prototype.draw = function(){
  this.ctx.clearRect(0,0,this.canSize[0],this.canSize[1]);
  this.ctx.drawImage(stars,0,0,this.canSize[0],this.canSize[1]);
  this.asteroids.forEach(function(el){
    el.draw();
  });
  
  if (this.asteroids.length === 0 && this.countDown === 0){
	  this.countDown = 3;
	  this.countDownTime = new Date();
	  var that = this;
	  _.delay(function(){
		  that.level++;
		  that.addAsteroids(that.level + that.baseAsteroid);
	  },3000)
  }
  
  this.timerDisplay.text(this.calcTime());
  this.scoreDisplay.text(this.score);
  
  var aL = this.asteroids.length;
  while(aL--){
	  this.asteroids[aL].destroyed ? this.asteroids.splice(aL,1) : this.asteroids[aL].draw();
  }
  
  var eL = this.explosions.length;
  while(eL--){
	  this.explosions[eL].destroyed ? this.explosions.splice(eL,1) : this.explosions[eL].draw();
  }
  
  var bL = this.bullets.length;
  while(bL--){
	  this.bullets[bL].collision();
	  this.bullets[bL].destroyed ? this.bullets.splice(bL,1) : this.bullets[bL].draw();
  }
  this.ship.input();
  this.ship.draw();
  if(this.countDown > 0) { this.levelCountDown(); }
  this.gameOver();
}

Game.prototype.addAsteroids = function(num) {
  for(var i = 0; i < num; i++){
	var asteroid = new Asteroid(this);
	while(this.ship.collision([asteroid], 100)){
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