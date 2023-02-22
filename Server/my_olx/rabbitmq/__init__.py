import pika
from pika.exchange_type import ExchangeType
import uuid
from threading import Thread

from django.conf import settings

class RabbitMQProducer:
    def __init__(self, on_message_callback) -> None:
        self.credentials = pika.PlainCredentials(*settings.RABBITMQ_AUTH_CREDENTIALS)
        self.connection_parameters = pika.ConnectionParameters(settings.RABBITMQ_HOST, credentials=self.credentials, heartbeat=0)
        self.connection = pika.BlockingConnection(self.connection_parameters)
        self.on_message_callback = on_message_callback
        self.configure()
    
    def configure(self):
        """
        Prepare the configuration
        """
        if not self.connection or self.connection.is_closed:
            self.connection = pika.BlockingConnection(self.connection_parameters)

        # Use the request pattern
        self.channel = self.connection.channel()
        
        # Configure request queue
        self.request_queue = self.channel.queue_declare(queue="offers-request")

    def send_message(self, msg, routing_key, number_attempts=5):
        correlation_id = str(uuid.uuid4())
        properties = pika.BasicProperties(
            correlation_id=correlation_id
        )

        self.channel.basic_publish(exchange='', routing_key=routing_key, body=msg, properties=properties)
        return correlation_id
