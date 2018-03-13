import { createSocket } from "dgram";

const socket = createSocket('udp4');

const self = process.argv[2] || Date.now().toString();

socket.on('message', (data) => {
    try {
        const jmsg = JSON.parse(data.toString());
        console.log(jmsg);
        // console.log(jmsg['b'], self);
        if (jmsg['b'] && self !== 'b') {
            console.log('hole');
            socket.send('Test', jmsg['b'].port, jmsg['b'].addr);
        }
    } catch (error) {
        console.log(data.toString());
    }
});

setInterval(() => {
    socket.send(JSON.stringify({ name: self }), 4646, 'localhost');
}, 1000);