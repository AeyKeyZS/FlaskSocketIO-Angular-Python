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

@SOCKETIO.on('call_from_ng')
def handlingCallFromNg(data):
    #### Do anything you want to do with the data
    emit('response_from_py', { 'data' : 'Anything' })    #### Sending response from python to angular app

if __name__ == '__main__':
    SOCKETIO.run(app,host='0.0.0.0',port=9000)