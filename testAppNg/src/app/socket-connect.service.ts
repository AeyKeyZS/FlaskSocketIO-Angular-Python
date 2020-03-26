import { Injectable } from '@angular/core';
import io from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class SocketConnectService {
    socket: any;
    constructor() {
    }
    createConnection() {
        this.socket = io.connect('http://192.168.137.1:9000/'); // Connection with Server using API, Enter Local IP carefully
        this.socket.on('connect_ngsocket', function (CONN_MSG) {
            console.log('HI, from Angular', CONN_MSG);
        });
    }
    getConnection() {
        return this.socket;
    }
}