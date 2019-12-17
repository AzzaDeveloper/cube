// Event handling
var startTime;
socket.on("update", (data) => {
    queue = data;
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