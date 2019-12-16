var express = require('express');
const app = new express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var users = 0;
var cubes = {};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.use(express.static('scripts'));

io.on('connection', (socket) => {
    users++;
    cubes[socket.id] = {};

    socket.on('state', (data) => {
        cubes[socket.id] = data;
    });
    socket.on('players', () => {
        socket.emit("players", users);
    });
    socket.on("ping", () => {
        socket.emit("pong");
    })

    setInterval(() => {
        io.emit("update", cubes);
    }, 1000/60);

    socket.on("disconnect", () => {
        delete cubes[socket.id];
        users--;
    })
});

http.listen(6969, () => {
    console.log('listening on 6969');
});
