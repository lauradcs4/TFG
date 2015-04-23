var TFG = TFG || {};

TFG.Game = function() {};

var hud    = null;
var player = null;
var level  = null;

var coins = null;
var hearts = null;

var goombas = null;
var throwers = null;
var throwers_hammer = null;

var currentTask = null;

TFG.Game.prototype = {

  submitCode: function() {

    /* 1- Obtener el codigo */
    var text = editor.getValue();

    /* 2- Testear el codigo */
    // Ejecutar la funcion de test correspondiente y obtener el resultado

    /* 3.1- Si ha acertado ejecutamos su codigo, eliminamos el codigo del editor, currentTask = null y desbloqueamos el juego */
    if (eval(currentTask.test)) {
        eval(currentTask.target + "=" + text);
        editor.getSession().setValue("", -1);
        currentTask = null;
        this.game.paused = false;
    }

  },

  create: function() {

    // Set background color
    this.game.stage.backgroundColor = '#009DFF';

    // Creates the HUD
    hud = new HUD(this.game);
    hud.create();

    // Creates the level
    level = new Level(this.game);
    level.create();

    // Creates player
    player = new Player(this.game);
    player.create(150, 480 ,'player_spritesheet', 0);

    var that = this;
    $('#submit-button').click(function() {that.submitCode.call(player)});
    $('#restart-button').click(setTask);
    
  },

  update: function(){

    player.update();
    level.update();
  }
}


var testMoveLeft = function (text) {
    tw = new TWUnit();
    var fakePlayer = player;

    try {
        eval("fakePlayer.move =" + text);
    }
    catch(e){
        console.log(e);
        tw.addAssert("Error de compilación", true == false, "", e.message);
        tw.runAsserts();
        return false;
    }

    fakePlayer.cursors.left.isDown = true;
        fakePlayer.move();
    fakePlayer.cursors.left.isDown = false;

    
    tw.addAssert("Animación", fakePlayer.sprite.animations.currentAnim === player.sprite.animations._anims["player_animation_moveLeft"], "Cambiar la animación para moverse a la izquierda", "Porque no pruebas con el play...");
    tw.addAssert("Direccion", fakePlayer.direction == State.LOOKINGLEFT, "Cambiar sprite para que mire hacia la izquierda.", "Podrías mirar el objeto State, aver que se te ocurre...");
    tw.addAssert("Velocidad", fakePlayer.sprite.body.velocity.x == fakePlayer.MAX_VELOCITY_X * (-1), "Mover personaje a la izquierda.", "Si ir a la derecha es positivo, a la izquierda será...");
    tw.runAsserts();


    return tw.assertsOk();
}

var testJump = function (text) {

    tw = new TWUnit();
    var fakePlayer = player;

    eval("fakePlayer.jump =" + text);

    fakePlayer.cursors.up.isDown = true;

    fakePlayer.jump();
    tw.addAssert("Animation", fakePlayer.sprite.animations.currentAnim === player.sprite.animations._anims["player_animation_jumpRight"], "Cambiar la animación al saltar cuando el jugador mira a la derecha", "Porque no pruebas con el play....");
    tw.addModule("Si el jugador esta mirando a la derecha");
    fakePlayer.cursors.up.isDown = false;

    /*fakePlayer.cursors.up.isDown = true;
    fakePlayer.direction = State.LOOKINGLEFT;
    fakePlayer.jump();
    tw.addAssert("Animation", fakePlayer.sprite.animations.currentAnim === player.sprite.animations._anims["player_animation_jumpLeft"], "Cambiar la animación al saltar cuando el jugador mira a la izquierda", "Porque no pruebas con el play....");
    tw.addModule("Si el jugador esta mirando a la izquierda");
    fakePlayer.cursors.up.isDown = false;*/

    tw.runModules();

    return tw.modulesOk();

}