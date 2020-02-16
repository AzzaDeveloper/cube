var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var players = 0;
//Queue of players
var queue = {};

function fillRect(x, y, width, height, mode) {
    if (mode == undefined) {
        ctx.fillRect(x, y, width, height);
    } else if (mode == "center") {
        ctx.fillRect(x - width / 2, y - height / 2, width, height);
    }
}
function renPlayer(cube) {
    // Name
    if (cube.color != undefined && cube.alive) {
        const color = cube.color;
        const meta = cube.meta;
        // Cube name
        ctx.fillStyle = color.cube;
        ctx.textAlign = "center";
        ctx.font = "20px Arial";
        ctx.fillText(cube.name, cube.x, cube.y - cube.width - 10);
        // White 2px border
        ctx.fillStyle = color.border;
        fillRect(cube.x, cube.y, cube.width, cube.height, "center");
        // Cube
        ctx.fillStyle = color.cube;
        fillRect(cube.x, cube.y, cube.width - 4, cube.height - 4, "center");
        // Health
        ctx.fillRect(cube.x - 30, cube.y + cube.width - 5, (cube.stats.health / cube.stats.maxHealth) * 60, 10)
        // Chat message 
        ctx.fillStyle = color.chatColor;
        ctx.fillText(cube.chatMessage, cube.x, cube.y + cube.height + 25);
        // Bullets
        ctx.fillStyle = color.cube;
        for (bullet in cube.bullets) {
            bullet = cube.bullets[bullet]
            fillRect(bullet.x, bullet.y, bullet.width, bullet.height, "center");
        }
    }
}
function renBullets() {
    for (bullet in rect.bullets) {
        bullet = rect.bullets[bullet];
        // Remove the bullet if its life is up
        if (Date.now() - bullet.date >= bullet.lifetime * 1000) {
            rect.bullets.splice(rect.bullets.indexOf(bullet), 1);
        }
        // Move the bullet according to the direction of the mouse
        // Homing type
        if (bullet.type == "homing") {
            const vx = mousex - bullet.x;
            const vy = mousey - bullet.y;
            const dist = Math.sqrt(vx * vx + vy * vy);
            console.log(dist)
            if (dist > bullet.width) {
                bullet.createProjectile(mousex, mousey)
            } else {
                bullet.dx = 0;
                bullet.dy = 0;
            }
        }
        // Default
        bullet.x += bullet.dx;
        bullet.y += bullet.dy;
        // Check collision with others players
        for (pplayer in queue) {
            player = queue[pplayer];
            if (bullet.checkCollision(player.x, player.y, player.width, player.height)) {
                // Send the damage event to the server
                socket.emit("damage", pplayer, bullet.damage)
                // Remove the bullet from the player
                rect.bullets.splice(rect.bullets.indexOf(bullet), 1);
            }
        }
        // Remove the bullet if its offscreen
        if ((bullet.x > canvas.width || bullet.x < 0) || (bullet.y > canvas.height || bullet.y < 0)) {
            rect.bullets.splice(rect.bullets.indexOf(bullet), 1);
        }
    }
}
setInterval(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}, 1000);
function render() {
    ctx.fillStyle = "#383838";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    checkKeys(); // input.js

    //Loop through the queue and draw them
    for (id in queue) {
        const cube = queue[id];
        renPlayer(cube);
    }
    // Draw the local player
    renPlayer(rect);
    // Handles the bullets
    renBullets();
    // Write down users and ping
    ctx.fillStyle = "white";
    ctx.textAlign = "end";
    ctx.fillText("Players online: " + players, canvas.width, canvas.height - 20);
    ctx.fillText("Ping: " + pingms + "ms", canvas.width, canvas.height);
    // Apply physics
    physics();
    // Send current state to server
    socket.emit("state", rect);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);