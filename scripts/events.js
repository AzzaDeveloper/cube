//import { rejects } from "assert";

// Event handling
var startTime;
socket.on("disconnect", (id) => {
    delete queue[id];
})
socket.on("update", (data, id) => {
    queue[id] = data;
});
socket.on("announcement", (data) => {
    alert(data);
})
socket.on("players", (data) => {
    players = data;
});
socket.on('pong', () => {
  pingms = Date.now() - startTime;
});

socket.on("damage", (amount) => {
    rect.stats.health -= amount;
    if (rect.stats.health <= 0) {
        //Reshow the html
        document.getElementById("chatbox").style.display ="none";
        document.getElementById("login").style.display ="block";
        document.getElementById("title").style.display = "block";
        document.getElementById("selection")
        canvas.style.filter = "blur(5)";
        // Kill it! Kill the rectangle!
        rect.x = undefined;
        rect.y = undefined;
        rect.alive = false;
    }
})