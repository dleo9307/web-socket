const express = require('express');
const app = express();

const httpServer = app.listen(8888, () => {
    console.log('HTTP Server Start 8888 PORT');
})


app.use("/", (req, res) => {
    res.sendFile('test-client.html',{ root: __dirname });
})

const socketIo = require('socket.io')(httpServer, { cors: { origin: "*" } });

socketIo.sockets.on('connection', function (socket) {
    socket.emit('test-client-event', {testKey: 'hey I`m alphaGo!'});

    socket.on('test-server-event', function (data) {
        console.log(data);
        socket.emit('test-client-event', {testKey: `메시지 잘 받았습니다! 받은 메시지 : ${data.testKey2}`});
    });
});
