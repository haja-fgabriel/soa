from django.urls import path
from api.views import OffersViewSet

urlpatterns = [
    path('offer', OffersViewSet.as_view()),
]