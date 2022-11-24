import asyncio
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .yahoo_finance import yahoo_finance_company_information


company_information_properties = [
    "longName",
    "symbol",
    "regularMarketPrice"
]


class CompanyInformationFetcherConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.connected = True

        await self.accept()

    async def receive(self, text_data):
        while self.connected:
            await asyncio.sleep(30)

            information = yahoo_finance_company_information(text_data)

            await self.send(
                json.dumps({
                    "information": information
                })
            )

    async def disconnect(self, close_code):
        self.connected = False
