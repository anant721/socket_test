var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/chat.html');
});

io.on('connection', (socket) =>{
    console.log('a user connected');
    socket.on('joined', function(data) {
        console.log(data);
        socket.emit('start', 'Notification of chat');
    });
    
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        socket.emit('response message', Math.floor(Math.random()*10000) + ' random number from server');
    });
});

http.listen(8080, ()=>{
    console.log(`Server listening on port 8080`);
});

