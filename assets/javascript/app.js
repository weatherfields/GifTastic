// Try using a loop that appends a button for each string in the array.

// When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// Under every gif, display its rating (PG, G, so on).

// This data is provided by the GIPHY API.
// Only once you get images displaying with button presses should you move on to the next step.

// Add a form to your page that takes a value from a user input box and adds it to your topics array. Then make a function call that takes each topic in the array and remakes the buttons on the page.

    //create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.
let topics = ['British Shorthair', 'American Bobtail', 'Russian Blue', 'Maine Coon', 'Munchkin cat', 'Chartreux','Exotic Shorthair', 'Ragamuffin cat', 'Pixie-bob'];
    // const gitLimit = 10;
const ratingLimit = "PG";
    
    // Your app should take the topics in this array and create buttons in your HTML.
    //creates the buttons
function btnMaker() {
    // $('#cat-buttons').empty();

    for (var i = 0; i < topics.length; i++) {
    
        let newBtn = $('<button>');
    newBtn.addClass('btn');
    newBtn.addClass('cat-button');
    newBtn.text(topics[i]);
    $('#cat-buttons').append(newBtn);
}
    // $(".cat-button").off("click");

    $(".cat-button").on("click", function(){
// below removes gifs to replace with new ones
        // $(".gif-image").off("click");
        $("#gifs").empty();
     makeGifs($(this).text());
 });
    }
    function makeButton(cat){
        if(topics.indexOf(cat) === -1) {
            topics.push(cat);
            $("#cat-buttons").empty();
            btnMaker();
        }
        }
    
    function makeGifs(cat){
        // 
        $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?q=" + cat + 
        "&api_key=WpcJGfq1lx8tint5rV8qaPjMBrEUc7dI&limit=10" + ratingLimit,
        method: 'GET'})
        .then(function(response){
            		response.data.forEach(function(element){
            			newDiv = $("<div>");
            			newDiv.addClass("unique-gifs");
            			newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
            			let catImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
            			catImage.addClass("cat-image");
            			catImage.attr("state", "still");
            			catImage.attr("still-data", element.images.fixed_height_still.url);
            			catImage.attr("animated-data", element.images.fixed_height.url);
            			newDiv.append(catImage);
            			$("#gifs").append(newDiv);
                    });
    
                    $(".gif-image").off("click");
                    $(".gif-image").on("click", function(){
                    	if($(this).attr("state") === "still") {
                    		$(this).attr("state", "animated");
                    		$(this).attr("src", $(this).attr("animated-data"));
                    	}
                    	else {
                    		$(this).attr("state", "still");
                    		$(this).attr("src", $(this).attr("still-data"));
                    	}
                    	});
        });
    }
$(document).ready(function(){
    btnMaker();
    //making a new button
    $('#submit').on("click", function(){
        let addCat = $("#newbreed").val().trim();
        topics.push(addCat);
        $("#newbreed").val('');
        btnMaker();
        event.preventDefault();
    })
	});

