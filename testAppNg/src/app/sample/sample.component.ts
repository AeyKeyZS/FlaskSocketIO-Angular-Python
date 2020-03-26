import { Component, OnInit } from '@angular/core';
import { SocketConnectService } from '../socket-connect.service';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {

  socket: any;
  message: String;
  constructor(private SCService: SocketConnectService) {
    this.socket = this.SCService.getConnection();
  }

  ngOnInit() {
    this.runTheMethod();
  }

  runTheMethod() {
    let THIS = this;
    // sending request to a python socket
    this.socket.emit('call_from_ng', {
      data: 'Any Data You Want To Send To Python App'
    });

    // recieving response from python socket
    this.socket.on('response_from_py', function (RESPONSE) {
      console.log(RESPONSE);
      THIS.message = RESPONSE['data'];
      // and do whatever you want
    });
  }

}
