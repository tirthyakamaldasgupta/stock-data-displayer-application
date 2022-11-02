from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import yfinance as yahoo_finance


def index(request):
    return render(request, 'main/index.html')


@api_view(['GET'])
def get_yahoo_finance_historical_data(request, company_name: str):
    company = yahoo_finance.Ticker(company_name)

    historical_data = company.history()

    if not historical_data.empty:
        return Response(
            {
                "result": historical_data.T.to_dict().values()
            },
            status.HTTP_200_OK
        )
    return Response(
        {
            "result": []
        },
        status.HTTP_404_NOT_FOUND
    )
