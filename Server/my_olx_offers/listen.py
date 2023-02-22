#!/usr/bin/env python
import os
import json
os.environ['DJANGO_SETTINGS_MODULE'] = 'my_olx_offers.settings'

import django
django.setup()

import redis
from rabbitmq import RabbitMQConsumer
from offers import service

r = redis.Redis(host="redis", port=6379, db=0)

def dispatch_message(channel, method, properties, body):
    print(f"New message from my_olx: {body}")
    correlation_id = properties.correlation_id
    if body == b"get all offers":
        result = service.get_all_offers()
    elif body.startswith(b"get offer;"):
        pk = body[len("get offer;"):].decode()
        print(f"correlation_id={correlation_id}  pk={pk}")
        result = service.get_offer(pk)
        print(f"correlation_id={correlation_id};  result={result}")
    r.set(correlation_id, json.dumps(result).encode())
    

consumer = RabbitMQConsumer(dispatch_message)
consumer.consume()