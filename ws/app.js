const express = require('express');
const app = express();
const httpServer = app.listen(7777, () => {
    console.log('HTTP Server Start 7777 PORT');
})


app.use("/", (req, res) => {
    res.sendFile('test-client.html',{ root: __dirname });
})


const wsModule = require('ws');
const webSocketServer = new wsModule.Server({server: httpServer});

webSocketServer.on('connection', (ws, request) => {
    console.log(request);
    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    console.log(`새로운 클라이언트[${ip}] 접속`);

    if (ws.readyState === ws.OPEN) {
        ws.send(`접속을 환영합니다😍`);
    }

    ws.on('message', (msg) => {
        console.log(`클라이언트[${ip}]에게 수신한 메시지 : ${msg}`);
        ws.send(`메시지 잘 받았습니다! 받은 메시지 : ${msg}`);
    })

    ws.on('error', (error) => {
        console.log(`클라이언트[${ip}] 연결 에러발생 : ${error}`);
    })

    ws.on('close', () => {
        console.log(`클라이언트[${ip}] 웹소켓 연결 종료`);
    })
});

