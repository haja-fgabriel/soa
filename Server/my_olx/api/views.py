import logging

from django.http import Http404
from django.http.response import HttpResponse

from rest_framework.permissions import IsAuthenticated
from rest_framework import views, status
from rest_framework.decorators import action
from rest_framework.response import Response

from services import offers

# TODO use a DB
_OFFERS_LIST = [
    {
        "id": "1",
        "name": "PlayStation 5 825 GB with game included",
        "price": dict(currency="USD", amount=1299),
        "image": "",
        "location": "Suceava",
        "lastUpdated": "2023-01-01T01:00:00Z",
        "fullDescription": "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasasdasdasdasd",
    }
]

_OFFERS_ID_MAPPINGS = {elem.get("id"): elem for elem in _OFFERS_LIST}

logger = logging.getLogger(__name__)


# TODO pass to my_olx_offers
class OffersListView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        logger.warning(f"rabbitmq producer: {offers.producer}")
        try:
            result = offers.get_all_offers()
            return Response(result)
        except TimeoutError:
            return Response(status=status.HTTP_408_REQUEST_TIMEOUT)



class OffersDetailView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        try:
            result = offers.get_offer(pk)
            return Response(result)
        except TimeoutError:
            return Response(status=status.HTTP_408_REQUEST_TIMEOUT)

    def _get_offer_or_404(self, pk):
        pk =  _OFFERS_ID_MAPPINGS.get(pk)
        if pk is None:
            raise Http404
        return pk

# class CommentsViewSet(viewsets.ViewSet):
#     def get_all(request):
#         # TODO pass to offers
#         pass

#     def get(request):
#         pass

#     def post(request):
#         # TODO request from my_olx_offers
#         data = {}
#         return Response(data, status=status.HTTP_201_CREATED)

#     def put(request):
#         pass

