const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app); // 웹소켓이기 때문에 http 모듈 필요함
const socketIO = require('socket.io');
const moment = require('moment');

const io = socketIO(server); // 변수에 server 담기

app.use(express.static(path.join(__dirname, 'src')));
const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
    // 커넥션 이루어지면 socket에 모든 정보 담음
    socket.on('chatting', (data) => {
        const { name, message } = data;
        io.emit('chatting', {
            name: name,
            message: message,
            time: moment(new Date()).format('YYYY-MM-DD HH:mm A'),
        });
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // 서버 실행 로그
});
