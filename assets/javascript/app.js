$(document).ready(function(){
    let topics = ['British Shorthair', 'American Bobtail', 'Russian Blue', 'Maine Coon'];
    
    let QueryURL = "https://api.giphy.com/v1/gifs/search?q=" + '' + "&api_key=WpcJGfq1lx8tint5rV8qaPjMBrEUc7dI";
    $.ajax({url: queryURL, method: 'GET'});


    
});