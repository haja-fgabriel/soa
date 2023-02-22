from services import producer, redis_conn
import json
import time

def get_all_offers():
    correlation_id = producer.send_message("get all offers", "offers-request")
    number_attempts=60
    while redis_conn.get(correlation_id) is None and number_attempts > 0:
        time.sleep(0.2)
        number_attempts -= 1
    if number_attempts == 0:
        raise TimeoutError()
    return json.loads(redis_conn.get(correlation_id).decode())

def get_offer(pk):
    correlation_id = producer.send_message(f"get offer;{pk}", "offers-request")
    number_attempts=60
    while redis_conn.get(correlation_id) is None and number_attempts > 0:
        time.sleep(0.2)
        number_attempts -= 1
    if number_attempts == 0:
        raise TimeoutError()
    return json.loads(redis_conn.get(correlation_id).decode())