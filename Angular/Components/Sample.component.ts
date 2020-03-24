import { Component, OnInit } from '@angular/core';
import { SocketConnectService } from './socket-connect.service';
@Component({
    selector: 'app-sample',
})
export class SampleComponent implements OnInit {

    socket: any;
    constructor(private SCService: SocketConnectService) {
        this.socket = this.SCService.getConnection();
    }

    ngOnInit() {
        this.runTheMethod();
    }

    runTheMethod() {
        // sending request to a python socket
        this.socket.emit('call_from_ng', {
            data: 'Any Data You Want To Send To Python App'
        });

        // recieving response from python socket
        this.socket.on('response_from_py', function (RESPONSE) {
            console.log(RESPONSE);
            // and do whatever you want
        });
    }

}