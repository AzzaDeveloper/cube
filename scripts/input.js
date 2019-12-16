var keys = {
    "w": false,
    "a": false,
    "s": false,
    "d": false,
}
document.addEventListener('keydown', function(e) {
    keys[e.key] = true;
});
document.addEventListener('keyup', function(e) {
    keys[e.key] = false;
});
function checkKeys() {
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