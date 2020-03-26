import { Component } from '@angular/core';
import { SocketConnectService } from './socket-connect.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testAppNg';
  socket;
  constructor(private SCService: SocketConnectService) {
    SCService.createConnection();
  }
}
