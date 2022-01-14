import { createServer } from 'http';
import Express from 'express';
import { Server as SocketIO } from 'socket.io';

const app = Express();
const server = createServer(app);
const io = new SocketIO(server);

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});