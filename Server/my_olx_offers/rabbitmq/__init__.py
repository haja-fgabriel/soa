import pika
from pika.exchange_type import ExchangeType

from django.conf import settings


class RabbitMQConsumer:
    def __init__(self, on_message_callback) -> None:
        self.credentials = pika.PlainCredentials(*settings.RABBITMQ_AUTH_CREDENTIALS)
        self.connection_parameters = pika.ConnectionParameters(settings.RABBITMQ_HOST, credentials=self.credentials)
        self.connection = None
        self.on_message_callback = on_message_callback
        self.configure()
    
    def configure(self):
        if not self.connection or self.connection.is_closed:
            self.connection = pika.BlockingConnection(self.connection_parameters)

        self.channel = self.connection.channel()
        self.channel.queue_declare(queue="offers-request")
        self.channel.basic_consume(queue="offers-request", auto_ack=True, on_message_callback=self.on_message_callback)

    def consume(self, number_conn_tries = 5):
        for i in range(number_conn_tries):
            try:
                self.channel.start_consuming()
            except pika.exceptions.ChannelWrongStateError:
                self.configure()
