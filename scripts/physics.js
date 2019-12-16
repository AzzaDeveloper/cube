function physics() {
    // Physics
    if (rect.velX >= rect.maxVel) {
        rect.velX = rect.maxVel;
    } else if (rect.velX <= -rect.maxVel) {
        rect.velX = -rect.maxVel;
    }
    if (rect.velY >= rect.maxVel) {
        rect.velY = rect.maxVel;
    } else if (rect.velY <= -rect.maxVel) {
        rect.velY = -rect.maxVel;
    }
    rect.x += rect.velX;
    rect.y += rect.velY;
    rect.velX *= 0.8;
    rect.velY *= 0.8;
}