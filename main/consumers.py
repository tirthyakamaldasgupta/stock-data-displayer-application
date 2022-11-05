import json
from time import sleep
from channels.generic.websocket import WebsocketConsumer
from .yahoo_finance import get_yahoo_finance_historical_data


class WebSocketConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

        yahoo_finance_historical_data = get_yahoo_finance_historical_data("aapl")

        while(True):
            self.send(
                json.dumps(
                    {
                        "historical_data": yahoo_finance_historical_data
                    }
                )
            )

            sleep(10)
