from offers.models import Offer
from offers.serializers import OfferSerializer

def get_all_offers():
    queryset = Offer.objects.all()
    serializer = OfferSerializer(queryset, many=True)
    return serializer.data

def get_offer(pk):
    obj = Offer.objects.filter(pk=pk).first()
    if obj:
        serializer = OfferSerializer(obj)
        return serializer.data