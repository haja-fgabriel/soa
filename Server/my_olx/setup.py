from setuptools import setup

setup(
    name="my_olx",
    version="0.0.1",
    author="HAJA Florin",
    description="Backend for an OLX-like offers store",
    install_requires=[
        "asgiref==3.6.0",
        "Django==4.1.7",
        "django-cors-headers==3.13.0",
        "djangorestframework==3.14.0",
        "pytz==2022.7.1",
        "sqlparse==0.4.3",
        "tzdata==2022.7"
    ]
)