from flask_restful import Resource
from models.message import Message as Message_model
from services.message_service import get_all_messages
from flask import json

class Messages(Resource):
    def get(self):
        return json.loads(get_all_messages()), 200