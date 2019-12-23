from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_socketio import SocketIO, send, join_room, leave_room, emit
import mongoengine
from config import MONGO_URL
from services.message_service import add_message
from resources.messages import Messages

mongoengine.connect(alias="default", host=MONGO_URL)

app = Flask(__name__)
CORS(app)
api = Api(app)
socketio = SocketIO(app, cors_allowed_origins="*")

#EndPoints
api.add_resource(Messages, "/messages/<string:roomId>")

#SocketIO
@socketio.on('message')
def handle_message(message):
    new_message = add_message(message)
    emit('message', new_message, room=message['room'], broadcast=True)

@socketio.on('connection')
def handle_connection(connection):
    join_room(connection['room'])

@socketio.on('disconnection')
def handle_disconnection(connection):
    leave_room(connection['room'])

if __name__ == '__main__':
    socketio.run(app)