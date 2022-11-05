import yfinance as yahoo_finance


def get_yahoo_finance_historical_data(company_name: str):
    company = yahoo_finance.Ticker(company_name)

    historical_data = company.history()

    if historical_data.empty:
        return []
    return list(historical_data.T.to_dict().values())
