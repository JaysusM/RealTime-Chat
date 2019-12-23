import mongoengine
from models.message import Message
from flask import jsonify
from bson.json_util import dumps

def get_all_messages():
    messages = Message.objects
    return messages.to_json()

def get_messages_from_room(roomId):
    query = []
    query.append({"$match": {"room": roomId}})
    messages = Message.objects.aggregate(*query)
    return dumps(messages)

def add_message(message):
    new_message = Message(username=message["username"], content=message["content"], datetime=message["datetime"], room=message["room"])
    new_message.save()
    return new_message.to_json()
    