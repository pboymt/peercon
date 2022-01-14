import { io } from 'socket.io-client';

(async (...args: string[]) => {

    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

})(...process.argv.slice(2));
