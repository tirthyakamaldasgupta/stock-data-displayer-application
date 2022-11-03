function display_historical_data() {
    const company_name = $("#company-search-input").val();

    if (company_name != '') {
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:8000/" + company_name + "/information",
            contentType: "application/json",
            success: function (data) {
                if (data["information"]) {
                    $("#company-heading").text(data["information"]["display_name"]);
                }
            },
            error: function (data) {
                console.log("No results found");
            }
        });

        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:8000/" + company_name + "/historical-data",
            contentType: "application/json",
            success: function (data) {
                if (data["historical_data"].length > 0) {
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

                    $("#company-search-input").val("");
                }
            },
            error: function (data) {
                console.log("No results found");

                $("#company-search-input").val("");
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
