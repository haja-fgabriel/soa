from rest_framework import serializers

class OfferSerializer(serializers.Serializer):
    id = serializers.CharField(max_length=30)
    name = serializers.CharField(max_length=100)
    price_amount = serializers.FloatField()
    price_currency = serializers.CharField(max_length=100)
    image = serializers.CharField()
    location = serializers.CharField(max_length=100)
    lastUpdated = serializers.DateTimeField()
    fullDescription = serializers.CharField()

    def to_representation(self, instance):
        """Convert `username` to lowercase."""
        ret = super().to_representation(instance)
        ret["price"] = {
            "amount": ret["price_amount"],
            "currency": ret["price_currency"],
        }
        ret.pop("price_amount")
        ret.pop("price_currency")
        return ret