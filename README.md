# Stock data displayer application

This is a sample web application to pull the data of any stock asynchronously from Yahoo and display the same.

## Functionalities

1. Display the information about a stock.
    
    Information:

    1.1.  Full name of the company, along with its symbol 
    
    1.2. Regular market price

2. Display the historical data of a stock.

3. Refresh the information of a stock (after every 30 seconds) using websockets (Django channels).

## Development stack

1. Client side technologies/frameworks

    1.1. HTML

    1.2. CSS

    1.3. Bootstrap (5.2.2)

    1.4. Javascript/jQuery (3.6.1)

2. Server side technologies/frameworks

    2.1. Python (3.10.8)/Django (4.1.3)

## Prerequisites

1. A working version of Python (>=3.10) should be installed in the system.

## Instructions

1. Create a virtual environment in the root directory.
    
    Windows

    `python -m venv venv`

    Linux

    `python3 -m venv venv`

    Mac

    `python3 -m venv venv`

2. Activate the same.

    Windows

    `venv\Scripts\activate`

    Linux

    `source venv/bin/activate`

    Mac

    `source venv/bin/activate`

3. Install the required python packages.

    `pip install -r requirements.txt`

4. Run the Django development server from the root directory.

    `python manage.py runserver`

5. Hit the URL: http://localhost:8000 on the browser.


## Limitations

1. Functional

    1.1. The application is capable to extract the information about the stocks of a company, only if the same is searched by providing the symbol of the company, for example "AAPL" or "aapl" (in case of "Apple Inc.").

2. System

    2.1. The application is only capable of functioning iff accessed via http://localhost:8000, not http://127.0.0.1:8000, due to the blockage by CORS policy to access the internal APIs via JavaScript/jQuery.