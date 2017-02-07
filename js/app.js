// Define the tile properties for global variables
// In line with settings in engine.js (line 135)
var tile = {
    width: 101,
    height: 83,
    heightOffset: 60
};

// To generate a random integer between a given range
function intRandom(min, max) {
    var result = Math.floor(Math.random() * (max - min + 1) + min);
    return result;
}

// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we"ve provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we"ve provided to easily load images
    this.sprite = "images/enemy-bug.png";
    this.speed = intRandom(60, 300);
    this.init();
};

Enemy.prototype.init = function () {
    this.x = -tile.width;
    this.y = Math.round(tile.height * intRandom(1, 3) - tile.height / 3);
};

// Update the enemy"s position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    if (this.x >= tile.width * 5) {
        // Ememy approached the end point, move back to the start point.
        this.reset();
    }

    if (this.checkCollision()) {
        // Game over
        console.log("You failed! Try again!");
        player.reset();
    }
};

Enemy.prototype.reset = function () {
    this.init();
    this.speed = Math.floor(Math.random() * 200) + 100;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function () {
    winLose = Math.abs(player.x - this.x) < tile.width / 2 && Math.abs(player.y - this.y) < tile.height / 2;
    //console.log (winLose);
    return winLose;
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    this.sprite = "images/char-boy.png";
    this.x = x;
    this.y = y;
};
Player.prototype.update = function () {
    // If player goes over water
    if (this.y < 0) {
        console.log("You made it!");
        this.reset();
    }
};

// Draw the player on the screen
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset player"s location
Player.prototype.reset = function () {
    this.x = tile.width * 2;
    this.y = tile.height * 3 + tile.heightOffset;
};

// Handle the input to move Player
Player.prototype.handleInput = function (key) {
    if (key == "left" && this.x > 0) {
        this.x -= tile.width;
    } else if (key == "right" && this.x < tile.width * 4) {
        this.x += tile.width;
    } else if (key == "up" && this.y > 0) {
        this.y -= tile.height;
    } else if (key == "down" && this.y < tile.height * 4 + tile.heightOffset) {
        this.y += tile.height;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies.push(new Enemy(), new Enemy(), new Enemy());

var player = new Player();
player.reset();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don"t need to modify this.
document.addEventListener("keyup", function (e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
