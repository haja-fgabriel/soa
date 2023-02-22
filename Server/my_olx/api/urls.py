from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api.views import OffersListView, OffersDetailView

urlpatterns = [
    path('token', TokenObtainPairView.as_view()),
    path('token/refresh', TokenRefreshView.as_view()),
    path('offer/', OffersListView.as_view()),
    path('offer/<pk>', OffersDetailView.as_view()),
]