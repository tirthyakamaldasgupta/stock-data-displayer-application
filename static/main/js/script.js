function display_historical_data() {

    const company_name = $("#company-search-input").val();
    $("#company-heading").text("");

    $("#historical-data-container-table").find("thead").empty();
    $("#historical-data-container-table").find("tbody").empty();

    if (company_name != '') {
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:8000/api/v1/" + company_name + "/information",
            contentType: "application/json",
            success: function (data) {
                if (data["information"]) {
                    $("#company-heading").text(data["information"]["display_name"]);
                }

                const live_historical_data_url = "ws://localhost:8000/ws/v1/" + "historical-data"

                var socket = new WebSocket(live_historical_data_url)
                
                socket.onmessage = function(event) {
                    var data = JSON.parse(event.data);
                    
                    if (data["historical_data"].length > 0) {
                        $("#historical-data-container-table").find("thead").empty();
                        $("#historical-data-container-table").find("tbody").empty();

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
                }
            },
            error: function (data) {
                $("#error-modal").find("p").text("Either no infomation about the company was found or you are not connected to the internet!");
                $("#error-modal").fadeIn();

                setTimeout(function () {
                    $("#error-modal").fadeOut();
                }, 5000);

                console.log("No results found");
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