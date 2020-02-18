const express = require('express');
const app = new express();
const fs = require('fs');
// Certificate
const privateKey = fs.readFileSync('certs/private.key', 'utf8');
const certificate = fs.readFileSync('certs/certificate.crt', 'utf8');
const ca = fs.readFileSync('certs/ca_bundle.crt', 'utf8');
const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};
//HTTPs server
const https = require('https').createServer(credentials, app);
//Socket.io
const io = require('socket.io')(https);
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var users = 0;
var cubes = {};
var ips = []
//Express
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
//Serving files
app.use(express.static(__dirname, { dotfiles: 'allow' } ));
app.use(express.static(".well-known"))
app.use(express.static('scripts'));
app.use(express.static('assets'));
// Socket.IO
io.emit("announcement", "The game has been updated, please reload the page.")
io.on('connection', (socket) => {
    var verified = false;
    const ip = socket.request.connection.remoteAddress.substr(7, socket.request.connection.remoteAddress.length);
    // Prevent same ip from connecting multiple times
    if (ips.indexOf(ip) != -1 && ip != "127.0.0.1") {
        console.log(`${yellow}${ip} tried to connect more than once.${reset}`);
        socket.disconnect();
    } else {
        verified = true;
        ips.push(ip);
        console.log(`${yellow}${ip} joined. ID: ${socket.id}`);
    }
    if (verified) {
        // Update user count
        users++;
        cubes[socket.id] = {};
        // Event handling
        socket.on('state', (data) => {
            cubes[socket.id] = data;
            socket.broadcast.emit("update", data, socket.id)
        });
        socket.on('damage', (data, amount) => {
            io.to(data).emit("damage", amount)
        });
        socket.on('players', () => {
            socket.emit("players", users);
        });
        socket.on("ping", () => {
            socket.emit("pong");
        })
        // Handle disconnections
        socket.on("disconnect", () => {
            console.log(`${yellow}${ip} left. ID: ${socket.id}${reset}`)
            io.emit("disconnect", socket.id)
            delete cubes[socket.id];
            ips.splice(ips.indexOf(ip), 1);
            users--;
        })
    }
});
//CLI
const black = "\u001b[30m"
const red = "\u001b[31m"
const green = "\u001b[32m"
const yellow = "\u001b[33m"
const blue = "\u001b[34m"
const magenta = "\u001b[35m"
const cyan = "\u001b[36m"
const white = "\u001b[37m"
const reset =" \u001b[0m"
// Host-only: Commands
rl.on('line', function (input) {
    if (input == "announcement") {
        rl.question(`${red}Enter message:${reset}`, (input) => {
            io.emit("announcement", input);
        })
    } else if (input == "ips") {
        console.log(ips)
    }
});
//HTTPs server
https.listen(443, () => {
    console.log(`${green}HTTPs server started. Listening on :443${reset}`);
});