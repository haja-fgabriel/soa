import sys
import redis
from rabbitmq import RabbitMQProducer
from threading import Thread

def dispatch_message(channel, method, properties, body, responses):
    print(f"Got response from client: {body}")
    responses[properties.correlation_id] = body

producer = RabbitMQProducer(dispatch_message)
redis_conn = redis.Redis(host="redis", port=6379, db=0)