from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response

# TODO pass to my_olx_offers
class OffersViewSet(viewsets.ViewSet):
    def get_all(request):
        # TODO pass to offers
        pass

    def get(request):
        pass

    def post(request):
        # TODO request from my_olx_offers
        data = {}
        return Response(data, status=status.HTTP_201_CREATED)

    def put(request):
        pass