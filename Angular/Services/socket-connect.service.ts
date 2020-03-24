import { Injectable } from '@angular/core';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketConnectService {
  socket: any;
  constructor() {

    this.socket = io.connect('http://<local IP>:9000/'); // Connection with Server using API, Enter Local IP carefully
    this.socket.on('connect_ngsocket', function (CONN_MSG) {
      console.log('HI, from Angular', CONN_MSG);
    });

  }
  getConnection() {
    return this.socket;
  }
}