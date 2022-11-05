function display_historical_data() {

    const company_name = $("#company-search-input").val();

    $("#company-search-input").val("");

    $("#information-fetch-error-span").text("");
    $("#historical-data-fetch-error-span").text("");
    $("#information-container-table-label").text("");
    $("#historical-data-container-table-label").text("");
    $("#information-container-table").find("thead").empty();
    $("#information-container-table").find("tbody").empty();
    $("#historical-data-container-table").find("thead").empty();
    $("#historical-data-container-table").find("tbody").empty();

    if (company_name != '') {
        $("#information-container-table-label").text("Information");
        $("#historical-data-container-table-label").text("Historical data");

        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:8000/" + company_name + "/information",
            contentType: "application/json",
            success: function (data) {
                if (data["information"]) {
                    $("#company-search-input").val("");

                    $("#information-container-table").find("thead").append(
                        "<tr>" +
                        "<th scope=\"col\">Company display name</th>" +
                        "<th scope=\"col\">Regular market price</th>" +
                        "</tr>"
                    );

                    $("#information-container-table").find("tbody").append(
                        "<tr>" +
                        "<td>" + data["information"]["display_name"] + "</td>" +
                        "<td id=\"regular-market-price-data\">" + data["information"]["regular_market_price"] + "</td>" +
                        "</tr>"
                    )

                    // const company_information_url = "ws://localhost:8000/ws/v1/" + "information"

                    // var socket = new WebSocket(company_information_url)
                    
                    // socket.onmessage = function(event) {
                    //     var data = JSON.parse(event.data);

                    //     $("#regular-market-price-data").text(data["information"]["regular_market_price"]);
                    // }
                }
            },
            error: function (data) {
                $("#information-fetch-error-span").text("Either no infomation about the company was found or you are not connected to the internet!");
            }
        });

        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:8000/" + company_name + "/historical-data",
            contentType: "application/json",
            success: function (data) {
                if (data["historical_data"].length > 0) {
                    $("#historical-data-container-table").find("thead").append(
                        "<tr>" +
                        "<th scope=\"col\">Open</th>" +
                        "<th scope=\"col\">High</th>" +
                        "<th scope=\"col\">Low</th>" +
                        "<th scope=\"col\">Close</th>" +
                        "<th scope=\"col\">Volume</th>" +
                        "<th scope=\"col\">Dividends</th>" +
                        "<th scope=\"col\">Stock Splits</th>" +
                        "</tr>"
                    );

                    $.each(data["historical_data"], function (index, item) {
                        $("#historical-data-container-table").find("tbody").append(
                            "<tr>" +
                            "<td>" + item["Open"] + "</td>" +
                            "<td>" + item["High"] + "</td>" +
                            "<td>" + item["Low"] + "</td>" +
                            "<td>" + item["Close"] + "</td>" +
                            "<td>" + item["Volume"] + "</td>" +
                            "<td>" + item["Dividends"] + "</td>" +
                            "<td>" + item["Stock Splits"] + "</td>" +
                            "</tr>"
                        )
                    });
                }
            },
            error: function (data) {
                $("#historical-data-fetch-error-span").text("Either no historical data about the company was found or you are not connected to the internet!");
            }
        });
    }
}


$("#company-search-input").keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);

    if (keycode == "13") {
        display_historical_data();
    }
});