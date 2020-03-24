# Angular Python Integration/ Connection using SocketIO Simple Way

<h2>Setup Both Ends-</h2>
<h3>Installation in Angular App</h3>
<p>In your angular application install a <a href="https://www.npmjs.com/package/socket.io" target="_blank">SocketIO</a> package:</p>

```bash
npm install socket.io
```

<p>or for current user only ( or if you don't have admin rights 😅 )</p>

```bash
npm install socket.io --user
```

<h3>Installation in Python</h3>
<p>In your python application you need to install <a href=https://pypi.org/project/Flask-SocketIO/" target="_blank">socket-io</a> library:</p>

```bash
pip install flask-socketio
```

<hr/>
<h2>Create a Connection</h2>
<h3>Python</h3>
<p>In your python file, you need to create a flask server and sockets for connection:</p>

``` py
from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
SOCKETIO = SocketIO(app)

@app.route('/')
def index():

    #### if you want it in your python app to return something if default route is called
    return render_template('index.html')

@SOCKETIO.on('connect')
def connect_message(message):

    emit('connect_ngsocket', {'data': True})

if __name__ == '__main__':

    SOCKETIO.run(app,host='0.0.0.0',port=9000)

```

<p>Then run your python application in terminal:</p>

```bash
python app.py
```

This will run the socket and print some message like:

<pre>
..
..
..
 * Running on http://0.0.0.0:9000/ (Press CTRL+C to quit) 
</pre>

<p>Here 0.0.0.0:9000 means the app  is running on local IP and port 9000</p>

<h3>Angular</h3>
<p>In your angular typescript file, you need to call for connection.</p>
<p>Here I am creating an angular service to create a connection:</p>

``` js
import {
    Injectable
} from '@angular/core';
import io from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class SocketConnectService {
    socket: any;
    constructor() {

        this.socket = io.connect('http://<local IP>:9000/'); // Connection with Server using API, Enter Local IP carefully
        this.socket.on('connect_ngsocket', function(CONN_MSG) {
            console.log('HI, from Angular', CONN_MSG);
        });

    }
    getConnection() {

        return this.socket;

    }
}
```

<p>Now you can import "SocketConnectService" in components or other services and use the connection setup by the service by calling its  <code>getConnection()</code> method</p>

<h3>Example: </h3>
<h4>Sample Angular Component</h4>

``` js
import {
    Component,
    OnInit
} from '@angular/core';
import {
    SocketConnectService
} from './socket-connect.service';
@Component({
    selector: 'app-sample',
    templateUrl: './Sample.component.html',
    styleUrls: ['./Sample.component.scss'],
    encapsulation: ViewEncapsulation.None
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
        this.socket.on('response_from_py', function(RESPONSE) {
            console.log(RESPONSE);
            // and do whatever you want
        });

    }

}
```

<h4>In your Python</h4>

``` py

@SOCKETIO.on('call_from_ng')
def handlingCallFromNg(data):

    #### Do anything you want to do with the data
    emit('response_from_py', { 'data' : 'Anything' })    #### Sending response from python to angular app

```

<p>If you encounter a bug or problem with this sample code, please submit a new issue so we know about it and can fix it.</p>
<p>For general issues refer associated forums and documentation</p>
<ul>
<li><a href="https://github.com/socketio/socket.io" target="_blank">npm socket.io</a></li>
<li><a href="https://github.com/miguelgrinberg/Flask-SocketIO/" target="_blank">python flask-socket.io</a></li>
</ul>

