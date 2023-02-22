from setuptools import setup

setup(
    name="my_olx_offers",
    version="0.0.1",
    author="HAJA Florin",
    description="Microservice for offers store",
    install_requires=[
        "Django==4.1.7",
        "pytz==2022.7.1",
        "sqlparse==0.4.3",
        "tzdata==2022.7",
        "pika==1.3.1",
        "django-composite-field==1.1.0",
        "djangorestframework==3.14.0",
        "redis==4.5.1",
    ]
)