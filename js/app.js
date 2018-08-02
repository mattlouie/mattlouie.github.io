// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    // Offset enemy so that it appears in middle of tiles
    // Added reset to enemy
    this.x = x;
    this.y = y + 55;
    this.step = 101;
    this.speed = speed;
    this.boundary = this.step * 5;
    this.resetPosition = -this.step;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < this.boundary) {
      this.x += this.speed * dt;
    } else {
      this.x = this.resetPosition;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Create hero so that he moves a tile at a time and he appears center of tile
class Hero {
  constructor () {
    this.step = 101;
    this.jump = 83;
    this.startX = this.step * 2;
    this.startY = (this.jump * 4) + 55;
    this.x = this.startX;
    this.y = this.startY;
    this.sprite = 'images/char-princess-girl.png';
    this.victory = false;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // Added input, which allows hero to move when key is pressed.
  // Also added boundaries for hero not to move outside gameboard
  handleInput(input) {
    switch(input) {
      case 'left':
        if (this.x > 0) {
          this.x -= this.step;
        }
        break;
      case 'up':
        if (this.y > 5) {
          this.y -= this.jump;
        }
        break;
      case 'right':
        if (this.x < this.step * 4) {
          this.x += this.step;
        }
        break;
      case 'down':
        if (this.y < this.jump * 4) {
          this.y += this.jump;
        }
        break;
    }
  }
  // Added collision and function to reset hero after collission
  update() {
    for (let enemy of allEnemies) {
      if (this.y === enemy.y &&
        this.x < enemy.x + 83 &&
        this.x + 83 > enemy.x &&
        this.y < enemy.y + 101 &&
        101 + this.y > enemy.y) {
        this.reset();
      }
    } if (this.y < 0) {
      this.victory = true;
    }
  }

  // Added reset function which resets hero when colliding with enemy
  reset() {
    this.y = this.startY;
    this.x = this.startX;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Hero();
const bug1 = new Enemy(-101, 0, 250);
const bug2 = new Enemy(-101, 83, 300);
const bug3 = new Enemy((-101 * 2.5), 166, 500);
const bug4 = new Enemy((-101 * 2), 0, 150);
const bug5 = new Enemy(-101, 166, 150)
const allEnemies = [];
allEnemies.push(bug1, bug2, bug3, bug4, bug5);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
