from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .yahoo_finance import yahoo_finance_company_information, yahoo_finance_historical_data


def index(request):
    return render(request, "main/index.html")


@api_view(["GET"])
def get_yahoo_finance_company_information(request, company_name: str):
    information = yahoo_finance_company_information(company_name)

    return Response(
        {
            "information": information if information else {}
        },
        status.HTTP_200_OK if information else status.HTTP_404_NOT_FOUND
    )


@api_view(["GET"])
def get_yahoo_finance_historical_data(request, company_name: str):
    historical_data = yahoo_finance_historical_data(company_name)

    return Response(
        {
            "historical_data": historical_data if historical_data else []
        },
        status.HTTP_200_OK if historical_data else status.HTTP_404_NOT_FOUND
    )
