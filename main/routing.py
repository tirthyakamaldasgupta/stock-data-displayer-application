from django.urls import path
from .consumers import CompanyInformationFetcherConsumer


websockets_urlpatterns = [
    path('ws/v1/information', CompanyInformationFetcherConsumer.as_asgi())
]
