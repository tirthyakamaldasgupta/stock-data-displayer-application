from django.urls import path
from .views import index, get_yahoo_finance_historical_data


urlpatterns = [
    path('', index, name='index'),
    path('<str:company_name>', get_yahoo_finance_historical_data, name='get_yahoo_finance_historical_data')
]
