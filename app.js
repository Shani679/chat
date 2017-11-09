const express=require('express');
const app=express();
const http=require('http').Server(app);
const io=require('socket.io')(http);
app.use(express.static('public'));
io.on('connection', socket=>{
	socket.on('chat', message=>{
		io.emit('chat', {username:socket.username, message: message});
	})
	socket.on('typing', ()=>{
	    socket.broadcast.emit('typing', {username: socket.username});
	});
	socket.on('nickname', name=>{
		socket.username=name;
	})
})
http.listen(3003, ()=>{
	console.log('server up');
})