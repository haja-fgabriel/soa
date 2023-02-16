FROM python:3.8

WORKDIR /app
COPY setup.py /app/setup.py
RUN pip install -e .
COPY . /app/

CMD python manage.py migrate && python manage.py runserver 0.0.0.0:8000
