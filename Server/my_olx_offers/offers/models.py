from django.db import models
from composite_field import CompositeField

CURRENCY_CHOICES = (
    ('USD', 'USD'),
    ('EUR', 'EUR'),
)

class PriceField(CompositeField):
    amount = models.FloatField()
    currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES)

class Offer(models.Model):
    id = models.CharField(max_length=30, primary_key=True)
    name = models.CharField(max_length=100)
    price = PriceField()
    image = models.TextField()
    location = models.CharField(max_length=100)
