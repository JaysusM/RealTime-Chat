from flask_restful import Resource
from models.message import Message as Message_model
from services.message_service import get_messages_from_room
from flask import json

class Messages(Resource):
    def get(self, roomId):
        return json.loads(get_messages_from_room(roomId)), 200