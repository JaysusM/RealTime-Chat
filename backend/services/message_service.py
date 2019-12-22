import mongoengine
from models.message import Message
from flask import json

def get_all_messages():
    messages = Message.objects
    return messages.to_json()

def add_message(message):
    new_message = Message(username=message["username"], content=message["content"], datetime=message["datetime"])
    new_message.save()
    return new_message.to_json()
    