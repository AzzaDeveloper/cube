var keys = {
    "w": false,
    "a": false,
    "s": false,
    "d": false,
}
var typing = false;
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
            input.blur();
            typing = false;
            rect.chatMessage = input.value;
            setTimeout(() => {
                rect.chatMessage = "";
            }, 5000);
        }
        input.value = "";
    }
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
function announcement(message) {
    socket.emit("announcement", message);
}