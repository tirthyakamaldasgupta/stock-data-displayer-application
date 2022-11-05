import yfinance as yahoo_finance


company_information_properties = [
    "longName",
    "symbol",
    "regularMarketPrice"
]


def yahoo_finance_historical_data(company_name: str):
    company = yahoo_finance.Ticker(company_name)

    historical_data = company.history()

    if historical_data.empty:
        return []
    return list(historical_data.T.to_dict().values())


def yahoo_finance_company_information(company_name: str):
    company = yahoo_finance.Ticker(company_name)

    company_information = company.info

    for company_information_property in company_information_properties:
        if company_information_property not in company_information.keys():
            return {}

    refined_company_information = {
        "display_name": company_information["longName"] + " " + "[" + company_information["symbol"] + "]",
        "regular_market_price": company_information["regularMarketPrice"]
    }

    return refined_company_information
