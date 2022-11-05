import json
from time import sleep
from channels.generic.websocket import WebsocketConsumer
from .yahoo_finance import yahoo_finance_company_information


company_information_properties = [
    "longName",
    "symbol",
    "regularMarketPrice"
]


class WebSocketConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

        information = yahoo_finance_company_information("aapl")

        while(True):
            self.send(
                json.dumps(
                    {
                        "information": information
                    }
                )
            )

            sleep(10)
