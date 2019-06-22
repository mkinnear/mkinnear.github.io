
const RIGHT_SPRITE = 0;
const LEFT_SPRITE = 1;
const UP_SPRITE = 2;
const DOWN_SPRITE = 3;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const KEY_UP = 38;
const PLAYER_SPEED = 4;
const WALL_BOUNDRY = 10;

var input, frames, levelFrame;
var direction, player, bullets, enemies, previousKey;
var playerSprite, bulletSprite, enemySprite;

var screen = new Screen(500, 600);

var x_init_position;
var y_init_position;
// Starts the game
function main() {
    input = new InputHandler();

    var image = new Image();
    image.addEventListener("load", function () {
        playerSprite = [new Sprite(this, 25, 25, 25, 77),
            new Sprite(this, 0, 25, 25, 77),
            new Sprite(this, 0, 0, 77, 25),
            new Sprite(this, 77, 0, 77, 25)];
        
        bulletSprite = [new Sprite(this, 50, 25, 25, 6),
            new Sprite(this, 75, 25, 25, 6),
            new Sprite(this, 154, 0, 6, 25),
            new Sprite(this, 160, 0, 6, 25)];
        
        enemySprite = [new Sprite(this, 88, 31, 29, 38),
            new Sprite(this, 117, 25, 43, 32),
            new Sprite(this, 50, 31, 38, 67),
            new Sprite(this, 166, 0, 50, 126)];

        if (isEmpty(x_init_position) && isEmpty(y_init_position)) {
            x_init_position = (screen.width - playerSprite[2].width) / 2;
            y_init_position = screen.height - (30 + playerSprite[2].height);
        }

        document.getElementById('start_btn').addEventListener('click', function() {
            x_input = document.getElementById('x_position_input').value;
            y_input = document.getElementById('y_position_input').value;
            
            if ((!isEmpty(x_input)) && (!isEmpty(y_input))) {
                x_init_position = x_input;
                y_init_position = yPosition(y_input);

                console.log(y_init_position);
                
        
                
                
            } 
        
            init();
            run();

        });

    });
    image.src = "resources/sprite.png";
}

// Initializes players
function init() {
    frames = 0;
    levelFrame = 60;

    // You have an option to select the position from user input
    player = {
      sprite: playerSprite[2],
        x: x_init_position,
        y: y_init_position
    };

    bullets = [];

    enemies = [];
    addEnemies(enemySprite[3], 400, 40, 50, 126);
    addEnemies(enemySprite[0], 300, 200, 38, 67);
    addEnemies(enemySprite[2], 120, 200, 29, 38);
    addEnemies(enemySprite[2], 230, 70, 29, 38);
    addEnemies(enemySprite[1], 170, 40, 43, 32);
    addEnemies(enemySprite[0], 80, 60, 38, 67);
    addEnemies(enemySprite[0], 30, 30, 38, 67);
}

// Adds enemies to the emenimes list
function addEnemies(sprite, x, y, width, height) {
    enemies.push({sprite: sprite,
        x: x,
        y: y,
        width: width,
        height: height});
}

function run() {
    var loop = function () {
        update();
        render();

        window.requestAnimationFrame(loop, screen.canvas);
    }
    window.requestAnimationFrame(loop, screen.canvas);
}

// Updates on navigating controls
function update() {

    // you can optimize code repetition
    if (input.isDown(KEY_LEFT)) { // left

        if (player.sprite !== playerSprite[LEFT_SPRITE]) {
            player.sprite = playerSprite[LEFT_SPRITE];
            if (previousKey === KEY_DOWN || previousKey === KEY_UP) {
                player.y -= 25;
                player.x += 25;
            }
        }

        player.x -= PLAYER_SPEED;
        previousKey = KEY_LEFT;
        wallCheck(player, LEFT_SPRITE);
    }
    if (input.isDown(KEY_RIGHT)) { // right

        if (player.sprite !== playerSprite[RIGHT_SPRITE]) {
            player.sprite = playerSprite[RIGHT_SPRITE];
            if (previousKey === KEY_DOWN || previousKey === KEY_UP) {
                player.y -= 25;
                player.x += 25;
            }
        }

        player.x += PLAYER_SPEED;
        previousKey = KEY_RIGHT;
        wallCheck(player, RIGHT_SPRITE);
    }
    if (input.isDown(KEY_UP)) { // up

        if (player.sprite !== playerSprite[UP_SPRITE]) {
            player.sprite = playerSprite[UP_SPRITE];
            if (previousKey === KEY_RIGHT || previousKey === KEY_LEFT) {
                player.y += 25;
                player.x -= 25;
            }
        }

        player.y -= PLAYER_SPEED;
        previousKey = KEY_UP;
        wallCheck(player, UP_SPRITE);
    }
    if (input.isDown(KEY_DOWN)) { // down

        if (player.sprite !== playerSprite[DOWN_SPRITE]) {
            player.sprite = playerSprite[DOWN_SPRITE];
            if (previousKey === KEY_RIGHT || previousKey === KEY_LEFT) {
                player.y += 25;
                player.x -= 25;
            }
        }

        player.y += PLAYER_SPEED;
        previousKey = KEY_DOWN;
        wallCheck(player, DOWN_SPRITE);
    }

    if (input.isPressed(32)) {
        bullets.push(new Bullet(player.x + 36, player.y, -8, 6, 15, "#fff"));
    }

    for (var i = 0, len = bullets.length; i < len; i++) {
        bullets[i].update();
    }

    frames++;
    if (frames % levelFrame === 0) {
        for (var i = 0, len = enemies.length; i < len; i++) {
            var enemy = enemies[i];
            enemy.y += 10;
        }
    }
}

function wallCheck(_player, spritePosition) {
    if (_player.x > screen.width - WALL_BOUNDRY - playerSprite[spritePosition].width) {
        _player.x = screen.width - WALL_BOUNDRY - playerSprite[spritePosition].width;
    }
    if (_player.x < WALL_BOUNDRY) {
        _player.x = WALL_BOUNDRY;
    }
    if (_player.y < WALL_BOUNDRY) {
        _player.y = WALL_BOUNDRY;
    }
    if (_player.y > screen.height - WALL_BOUNDRY - playerSprite[spritePosition].height) {
        _player.y = screen.height - WALL_BOUNDRY - playerSprite[spritePosition].height;
    }
}

function render() {
    screen.clear();

    for (var i = 0, len = enemies.length; i < len; i++) {
        var e = enemies[i];
        screen.drawSprite(e.sprite, e.x, e.y);
    }

    screen.ctx.save();
    for (var i = 0, len = bullets.length; i < len; i++) {
        var bulet = bullets[i];
        screen.drawBullet(bulet);
    }
    screen.ctx.restore()

    screen.drawSprite(player.sprite, player.x, player.y);
}



function yPosition(y) {
    console.log(playerSprite.height);
    
    if (y >= 0 && (y <= screen.height - playerSprite[2].height)) {
        return y;
    } else if (y < 0) {
        return 0;
    } else if (y > (screen.height - playerSprite[2].height)) {
        return screen.height - playerSprite[2].height;
    }
    
    
}

function isEmpty(input) {
    return input == null || input == NaN || input == undefined || input.length == 0;
}


main();