function physics() {
    // Prevent players from moving through walls
    if (rect.x + rect.width / 2 >= canvas.width) {
        rect.x = canvas.width - rect.height / 2;
    }
    if (rect.x - rect.width / 2 <= 0) {
        rect.x = 0 + rect.width / 2;
    }
    if (rect.y + rect.height / 2 >= canvas.height) {
        rect.y = canvas.height - rect.height / 2;
    }
    if (rect.y - rect.height / 2 <= 0) {
        rect.y = 0 + rect.height / 2;
    }
    // Physics magic. I swear it'll make sense.
    var info = physicsInfo;
    if (!rect.dashing) {
        if (info.velX >= info.maxVel) {
            info.velX = info.maxVel;
        } else if (info.velX <= -info.maxVel) {
            info.velX = -info.maxVel;
        }
        if (info.velY >= info.maxVel) {
            info.velY = info.maxVel;
        } else if (info.velY <= -info.maxVel) {
            info.velY = -info.maxVel;
        }
    }
    rect.x += info.velX;
    rect.y += info.velY;
    info.velX *= 0.8;
    info.velY *= 0.8;
}