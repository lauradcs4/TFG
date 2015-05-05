HUD = function(game) {
	this.game        = game;

	this.score       = 0;
	this.scoreString = '';
	this.scoreText   = null;

	this.lives       = 3;
	this.livesString = '';
	this.livesText   = null;

	this.hearts      = null;
	this.heartSpace  = 20;
};

HUD.prototype = {

	create: function() {

		this.scoreString = 'Score: ';
		this.scoreText = this.game.add.text(0, 0, this.scoreString + this.score, { fontSize: '32px', fill: '#FFF' });
		this.scoreText.fixedToCamera = true;
		this.scoreText.cameraOffset.setTo(16, 16);

		/*this.livesString = 'Lives: ';
		this.livesText = this.game.add.text(0, 0, this.livesString + this.lives, { fontSize: '32px', fill: '#FFF' });
		this.livesText.fixedToCamera = true;
		this.livesText.cameraOffset.setTo(580, 16);*/
		this.hearts = [this.game.add.sprite(580, 30, 'heart'),
					  this.game.add.sprite(580 + this.heartSpace, 30, 'heart'),
					  this.game.add.sprite(580 + this.heartSpace*2, 30, 'heart')];
		for (i = 0; i < this.lives; ++i){
			this.addHearts(i);
		}
	},


	addHearts: function(i){
		this.game.physics.enable(this.hearts[i]);
		this.hearts[i].anchor.setTo(0.5, 0.5); // centro de la rotacion
		this.hearts[i].fixedToCamera = true;

	    var rotate = this.game.add.tween(this.hearts[i])
	    	.to({ angle: this.hearts[i].angle + 360 }, 4000, Phaser.Easing.Linear.None).loop();

	    var splash = this.game.add.tween(this.hearts[i].scale)
	    	.to({ x: this.hearts[i].scale.x - 0.5, y: this.hearts[i].scale.y - 0.5 }, 2000, Phaser.Easing.Linear.None)
	    	.to({ x: this.hearts[i].scale.x , y: this.hearts[i].scale.y }, 2000, Phaser.Easing.Linear.None).loop();
	    	

	    splash.start();
	    rotate.start();
		
	},

	addLives: function(){
		this.lives++;
		this.addHeart(this.hearts.length);
	},

	removeLives: function(){
		this.lives--;
		var heart = this.hearts.pop();
		heart.destroy();
	}


};