from django.urls import path
from .views import index, get_yahoo_finance_company_information, get_yahoo_finance_historical_data


urlpatterns = [
    path(
        '',
        index,
        name='index'
    ),
    path(
        '<str:company_name>/information',
        get_yahoo_finance_company_information,
        name='get_yahoo_finance_company_information'
    ),
    path(
        '<str:company_name>/historical-data',
        get_yahoo_finance_historical_data,
        name='get_yahoo_finance_historical_data'
    )
]
