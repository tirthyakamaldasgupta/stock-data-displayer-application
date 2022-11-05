from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import yfinance as yahoo_finance


company_information_properties = [
    "longName",
    "symbol"
]


def index(request):
    return render(request, "main/index.html")


@api_view(["GET"])
def get_yahoo_finance_company_information(request, company_name: str):
    company = yahoo_finance.Ticker(company_name)

    company_information = company.info

    for company_information_property in company_information_properties:
        if company_information_property not in company_information.keys():
            return Response(
                {
                    "information": {}
                },
                status.HTTP_404_NOT_FOUND
            )

    company_display_name = company_information["longName"] + " " + "[" + company_information["symbol"] + "]"

    return Response(
        {
            "information": {
                "display_name": company_display_name
            }
        },
        status.HTTP_200_OK
    )
