from django.urls import path
from .views import index, get_yahoo_finance_company_information


urlpatterns = [
    path(
        '',
        index,
        name='index'
    ),
    path(
        'api/v1/<str:company_name>/information',
        get_yahoo_finance_company_information,
        name='get_yahoo_finance_company_information'
    )
]
