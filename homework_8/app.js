const express = require('express');

const app = express();

const server = require('http').Server(app);

const io = require('socket.io')(server);

let rooms = 0;

app.use(express.static(__dirname + "/public"))


app.get('/', function (req, res) {
    res.sendFile('/index.html');
});

let room = null;

io.on('connection', function (socket) {
    socket.on("createGame", data=>{
        socket.join(`room-${++rooms}`);
        socket.emit("newGame", {
            name:data.name,
            room:`room-${rooms}`
        })
    })
    socket.on('joinGame', function (data) {
        //console.log(io.of("/").adapter.rooms.get(data.room).size);
            room = io.of("/").adapter.rooms.get(data.room);
        if (room && room.size === 1) {
            socket.join(data.room);
            socket.broadcast.to(data.room).emit('player1', {});
            socket.emit('player2', { name: data.name, room: data.room })
        }else{
            socket.emit('err', { message: 'Sorry, The room is full!' });
        }
    });
    socket.on("playTurn", data=>{
        io.to(data.room).emit("turnPlayed", data)
        socket.to(data.room).emit('setTurn', {});
    })
    socket.on("win", data=>{
        socket.broadcast.to(data.room).emit("announceWinner", data)
    })
})




server.listen(3000,()=>{
    console.log("Server is running ...")
});