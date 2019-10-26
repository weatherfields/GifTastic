//create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.
let topics = ['Chartreux', 'American Bobtail', 'Russian Blue', 'Maine Coon', 'Munchkin cat', 'British Shorthair', 'Exotic Shorthair', 'Ragamuffin cat', 'Pixie-bob'];

$(document).ready(function () {
    btnMaker();
    //making a new breed button
    $('#submit').on("click", function () {
        let addCat = $("#newbreed").val().trim();
        topics.push(addCat);
        $("#newbreed").val('');
        btnMaker();
        event.preventDefault();
    })
});
//creates the buttons from the array
function btnMaker() {
    // line below prevents copying everything every time a new button is added
    $('#cat-buttons').empty();
    // loop that appends a button for each string in the array.
    for (let i = 0; i < topics.length; i++) {

        let newBtn = $('<button>');
        newBtn.addClass('btn');
        newBtn.addClass('btn-lg');
        newBtn.addClass('cat-button');
        newBtn.text(topics[i]);
        $('#cat-buttons').append(newBtn);
    }
    $(".cat-button").on("click", function () {
        // below adds initial gifs and removes gifs to replace with new ones
        $("#gifs").empty();
        // allows individual creation of gifs
        makeGifs($(this).text());
    });
}

function makeGifs(cat) {
    // When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
    $.ajax({
            url: "https://api.giphy.com/v1/gifs/search?q=" + cat +
                "&api_key=WpcJGfq1lx8tint5rV8qaPjMBrEUc7dI&limit=10",
            method: 'GET'
    }).then(function (response) {
        response.data.forEach(function (element) {
        newDiv = $("<div>");
        newDiv.addClass("unique-gifs");
        let catImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
        catImage.addClass("cat-image");
        // default state should be "still" so that clicks can animate.
        catImage.attr("state", "still");
        catImage.attr("still-data", element.images.fixed_height_still.url);
        catImage.attr("animated-data", element.images.fixed_height.url);
        newDiv.append(catImage);
        newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
        $("#gifs").append(newDiv);
});
    // When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
        $(".cat-image").on("click", function () {
            if ($(this).attr("state") === "still") {
                $(this).attr("state", "animated");
                $(this).attr("src", $(this).attr("animated-data"));
            } else {
                $(this).attr("state", "still");
                $(this).attr("src", $(this).attr("still-data"));
            }
            });
})
};
