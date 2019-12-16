var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var players = 0;
var pingms = 0;

function render() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "#383838";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    checkKeys(); //input.js

    //Loop through all the infos of players
    for(id in queue) {
        const cube = queue[id];
        // Name
        ctx.fillStyle = cube.color;
        ctx.textAlign = "center";
        ctx.font = "20px Arial";
        ctx.fillText(cube.name, cube.x + cube.width / 2, cube.y - cube.height + 10);
        // White 2px border
        ctx.fillStyle = "white";
        ctx.fillRect(cube.x, cube.y, cube.width, cube.height);
        // Cube
        ctx.fillStyle = cube.color;
        ctx.fillRect(cube.x + 2, cube.y + 2, cube.width - 4, cube.height - 4);
    }
    // Write down users and ping
    ctx.fillStyle = "white";
    ctx.textAlign = "end";
    ctx.fillText("Players online: " + (players - 1), canvas.width, canvas.height - 20);
    ctx.fillText("Ping: " + pingms + "ms", canvas.width, canvas.height);

    physics();

    socket.emit("state", rect);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);