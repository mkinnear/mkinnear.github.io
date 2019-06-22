// Helper Methods

// Bullets
function Bullet(x, y, velocity, width, height, color) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.width = width;
    this.height = height;
    this.color = color;
}

Bullet.prototype.updateShootUp = function () {
    this.y += this.velocity;
};

Bullet.prototype.updateShootDown = function () {
    this.y -= this.velocity;
};

Bullet.prototype.updateShootLeft = function () {
    this.x += this.velocity;
};

Bullet.prototype.updateShootRight = function () {
    this.x -= this.velocity;
};

Bullet.prototype.update = function () {
    this.y += this.velocity;
};



// Screen class
function Screen(width, height) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width = width;
    this.canvas.height = this.height = height;
    this.ctx = this.canvas.getContext("2d");

    document.body.appendChild(this.canvas);
}

Screen.prototype.drawSprite = function (sprite, x, y) {
    this.ctx.drawImage(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height,
        x, y, sprite.width, sprite.height);
};

Screen.prototype.drawBullet = function (bullet) {
  this.ctx.fillStyle = bullet.color;
  this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
};

Screen.prototype.clear = function () {
    this.ctx.clearRect(0,0, this.width, this.height);
};

// Sprite class
function Sprite(image, x, y, width, height) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

// Input Handler
function InputHandler() {
    this.down = {};
    this.pressed = {};

    var _this = this;
    document.addEventListener("keydown", function (evt) {
        _this.down[evt.keyCode] =  true;
    });
    document.addEventListener("keyup", function (evt) {
        delete _this.down[evt.keyCode];
        delete _this.pressed[evt.keyCode];
    });
}

InputHandler.prototype.isDown = function (code) {
    return this.down[code];
};

InputHandler.prototype.isPressed = function (code) {
    if (this.pressed[code]) {
        return false;
    } else if (this.down[code]) {
        return this.pressed[code] = true;
    }
    return false;
};
