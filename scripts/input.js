var keys = {
    "w": false,
    "a": false,
    "s": false,
    "d": false,
}
var typing = false;
var pingms = 0;

var mousex;
var mousey;

var chatTimeout;
document.addEventListener('keydown', function(e) {
    if (!typing) {
        keys[e.key] = true;
    }
    if (e.key == "Enter") {
        const input = document.getElementById("chatbox");
        if (!typing) {
            input.focus();
            typing = true;
        } else {
            clearTimeout(chatTimeout);
            input.blur();
            typing = false;
            rect.chatMessage = input.value;
            chatTimeout = setTimeout(() => rect.chatMessage = "", 5000);
        }
        input.value = "";
    }
});
document.addEventListener('keyup', function(e) {
    keys[e.key] = false;
});
canvas.addEventListener('mousedown', (e) => {
    if (e.button == 0) {
        for (loop in rect.bullet.loops) {
            console.log(loop)
            var bullet = rect.bullet.loops[loop];
            var x = rect.x + bullet.startX;
            var y = rect.y + bullet.startY;
            for (i = 0; i < bullet.amount; i++) {
                console.log(x);
                //Create a new bullet at center of player
                var bullete = new projectile(x, y, rect.bullet.width, rect.bullet.width, rect.bullet.speed, rect.bullet.damage);
                // Generate velocity for bullet
                bullete.createProjectile(e.clientX, e.clientY);
                // Add to array of bullets
                rect.bullets.push(bullete);
                x += bullet.offsetX;
                y += bullet.offsetY;
            }
        }
    } else {
        if (!rect.dashing) {
            rect.dashing = true;
            const vx =  e.clientX - rect.x;
            const vy =   e.clientY -  rect.y;
            const dist = Math.sqrt(vx*vx+vy*vy);
            rect.velX = vx / dist * 50;
            rect.velY = vy / dist * 50;
            setTimeout(() => {rect.dashing = false;}, 500)
        }
    }
})
function checkKeys() {
    if (!rect.dashing) {
        if (keys["w"]) {
            rect.velY -= 5;
        }
        if (keys["a"]) {
            rect.velX -= 5;
        }
        if (keys["s"]) {
            rect.velY += 5;
        }
        if (keys["d"]) {
            rect.velX += 5;
        }
    }
}