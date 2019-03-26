
 var results = "";
var tempUrl= "";

$("#add-animal").on("click", function (event) {
    event.preventDefault();
    var animalstore = $("#animalAdd").val().trim();;

    var newAbtn = $("<button>");
    newAbtn.addClass("playing");
    newAbtn.text(animalstore);

    $("#btn-div").append(newAbtn);

    $("#animalAdd").val("");
   

});

$("#btn-div").on('click', 'button', function () {
    var animal = $(this).text();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(queryURL);

            console.log(response);
            results = response.data;

            $("#gifs-appear-here").empty();
            for (var i = 0; i < results.length; i++) {

                var animalDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                animalImage = $("<img>");

                animalImage.attr("src", results[i].images.fixed_height.url);
                tempUrl = animalImage.attr("src");
                animalDiv.append(p);
                animalDiv.append(animalImage);
                console.log(animalImage);
                console.log(tempUrl);

                $("#gifs-appear-here").prepend(animalDiv);
            }
        });
    $(document).on('click', function () {
        var state = $(this).attr('data-state');
        console.log(state);
        if ( state == 'animate'){
            tempUrl = tempUrl.replace(".gif", "_s.gif");
            $(this).attr('src', "tempUrl");
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
            console.log(tempUrl);
        }else{
            tempUrl = tempUrl.replace("_s.gif", ".gif")
            $(this).attr('src', "tempUrl");
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }

    });
});