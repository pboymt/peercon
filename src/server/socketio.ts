import { Server as SocketIO, Socket } from 'socket.io';
import { Server } from 'http';

export interface ServerToClientEvents {
    'auth.required': () => void;
    'auth.success': (token: string) => void;
}

export interface ClientToServerEvents {
    'auth.login': (name: string, passwd: string) => void;
    'auth.logout': () => void;
}

interface InterServerEvents {

}

interface SocketData {
    name: string;
    age: number;
}

export class SocketIOServer {

    private io: SocketIO<ClientToServerEvents, ServerToClientEvents>;
    private clients: Map<string, Socket> = new Map();

    private constructor(server: Server) {
        this.io = new SocketIO(server);
        this.init();
    }

    static create(server: Server): SocketIOServer {
        return new SocketIOServer(server);
    }

    public init(): void {
        this.io.on('connection', (socket) => {
            console.log('New client connected');
            this.clients.set(socket.id, socket);
            socket.emit('auth.required');

            socket.on('auth.login', (name: string, passwd: string) => {});
            socket.on('disconnect', () => {
                this.clients.delete(socket.id);
            });
        });
    }

}