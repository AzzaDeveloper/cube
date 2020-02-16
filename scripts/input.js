var keys = {
    "w": false,
    "a": false,
    "s": false,
    "d": false,
}
var typing = false;
var pingms = 0;
// Current mouse position
var mousex;
var mousey;
// Timeout variable for chat messages
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
            //Delete the chat message after 5 seconds
            chatTimeout = setTimeout(() => rect.chatMessage = "", 5000);
        }
        input.value = "";
    }
});
document.addEventListener('keyup', function(e) {
    keys[e.key] = false;
});
//Update the mouse position everytime it moves
canvas.addEventListener("mousemove", function(e) {
    mousex = e.clientX;
    mousey = e.clientY;
})
var intervalfire;       //Interval var for shoot loop
var shootable = true;  
canvas.addEventListener('mousedown', (e) => {
    if (e.button == 0) {
        function shoot() {
            for (loop in bulletInfo.loops) {
                //Get the current bullet generation loop
                var bullet = bulletInfo.loops[loop];
                //Offset the bulelt by startx/y
                var x = rect.x + bullet.startX;
                var y = rect.y + bullet.startY;
                for (i = 0; i < bullet.amount; i++) {
                    //Create a new bullet at center of player
                    var info = bulletInfo;
                    var bullete = new projectile(x, y, info.width, info.width, info.speed, info.damage, info.type, info.lifetime);
                    // Generate velocity for bullet and add to array of bullets
                    bullete.createProjectile(mousex, mousey);
                    //Adjust the offset
                    x += bullet.offsetX;
                    y += bullet.offsetY;
                }
            }
        }
        //Fire the bullet when left click is holded
        if (shootable) {
            shoot();
            shootable = false;
            setTimeout(() => shootable = true, bulletInfo.rate * 1000)
        }
        intervalfire = setInterval(() => {
           shoot();
        }, bulletInfo.rate * 1000)
    //Dash code
    } else {
        if (!rect.dashing) {
            rect.dashing = true;
            const vx =  e.clientX - rect.x;
            const vy =   e.clientY -  rect.y;
            const dist = Math.sqrt(vx*vx+vy*vy);
            physicsInfo.velX = vx / dist * physicsInfo.dashSpeed;
            physicsInfo.velY = vy / dist * physicsInfo.dashSpeed;
            setTimeout(() => {rect.dashing = false;}, 300)
        }
    }
})
//Stop shooting if the mouse is released
canvas.addEventListener("mouseup", (e) => {
    if (e.button == 0) {
        clearInterval(intervalfire);
    }
})
function checkKeys() {
    if (!rect.dashing) {
        //Movement
        if (keys["w"]) {
            physicsInfo.velY -= 5;
        }
        if (keys["a"]) {
            physicsInfo.velX -= 5;
        }
        if (keys["s"]) {
            physicsInfo.velY += 5;
        }
        if (keys["d"]) {
            physicsInfo.velX += 5;
        }
    }
}