from mongoengine import Document, StringField, IntField
import time

class Message(Document):
        username = StringField(required=True)
        content = StringField(required=True)
        room = StringField(required=True)
        datetime = IntField(default=time.time(), required=True)