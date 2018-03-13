import { createSocket } from "dgram";

const socket = createSocket('udp4');

interface Client {
    addr: string;
    port: number;
}

interface ClientMessage {
    name: string;
}

const clients: { [name: string]: Client } = {};

socket.on('message', (msg, rinfo) => {
    try {
        // console.log(msg);
        const jmsg: ClientMessage = JSON.parse(msg.toString());
        if (jmsg.name) {
            clients[jmsg.name] = {
                addr: rinfo.address,
                port: rinfo.port
            }
            console.log(`${rinfo.address}:${rinfo.port}\t ${msg.toString()}`);
            socket.send('Logined', rinfo.port, rinfo.address);
        } else {
            socket.send(JSON.stringify(clients), rinfo.port, rinfo.address);
        }
    } catch (error) {
        socket.send('Message.', rinfo.port, rinfo.address);
    }
});

socket.bind(4646, '0.0.0.0', () => {
    console.log('listening');
});