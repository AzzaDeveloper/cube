const express = require('express');
const app = new express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var users = 0;
var ips = []
var cubes = {};
//Express
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.use(express.static('scripts'));
app.use(express.static('assets'));
// Socket.IO
io.on('connection', (socket) => {
    var verified = false;
    const ip = socket.request.connection.remoteAddress.substr(7, socket.request.connection.remoteAddress.length);
    // Prevent same ip from connecting multiple times
    if (ips.indexOf(ip) != -1 && ip != "127.0.0.1") {
        console.log(ip + " tried to connect more than once.");
        socket.disconnect();
    } else {
        verified = true;
        ips.push(ip);
        console.log(ip + " joined.");
    }
    if (verified) {
        // Update user count
        users++;
        // Add newly connected user to object of all players
        cubes[socket.id] = {};
        // Event handling
        socket.on('state', (data) => {
            cubes[socket.id] = data;
        });
        socket.on('players', () => {
            socket.emit("players", users);
        });
        socket.on("ping", () => {
            socket.emit("pong");
        })
        // Send positions of all cubes back to clients
        setInterval(() => {
            io.emit("update", cubes);
        }, 0);
        // Handle disconnections
        socket.on("disconnect", () => {
            console.log(ip + " left.")
            delete cubes[socket.id];
            ips.splice(ips.indexOf(ip), 1);
            users--;
        })
    }
});
http.listen(6969, () => {
    console.log('Server started. Listening on :6969');
});
// Host-only: Commands
rl.on('line', function (input) {
    if (input == "announcement") {
        rl.question("Enter message: ", (input) => {
            io.emit("anouncement", input);
        })
    }
});