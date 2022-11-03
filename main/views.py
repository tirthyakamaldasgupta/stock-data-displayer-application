from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import yfinance as yahoo_finance


def index(request):
    return render(request, "main/index.html")


@api_view(["GET"])
def get_yahoo_finance_historical_data(request, company_name: str):
    company = yahoo_finance.Ticker(company_name)

    historical_data = company.history()

    if not historical_data.empty:
        return Response(
            {
                "historical_data": historical_data.T.to_dict().values()
            },
            status.HTTP_200_OK
        )
    return Response(
        {
            "historical_data": []
        },
        status.HTTP_404_NOT_FOUND
    )

@api_view(["GET"])
def get_yahoo_finance_company_information(request, company_name: str):
    company = yahoo_finance.Ticker(company_name)

    company_information = company.info

    if company_information:
        company_display_name = company_information["longName"] + " " + "[" + company_information["symbol"] + "]"
        
        return Response(
            {
                "information": {
                    "display_name": company_display_name
                }
            },
            status.HTTP_200_OK
        )
    return Response(
        {
            "information": {}
        },
        status.HTTP_404_NOT_FOUND
    )
