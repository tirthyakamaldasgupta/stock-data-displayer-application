from django.urls import path
from .consumers import WebSocketConsumer


websockets_urlpatterns = [
    path('ws/v1/historical-data', WebSocketConsumer.as_asgi())
]
