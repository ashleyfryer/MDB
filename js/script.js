$(window).on("load", function () {
        nowPlaying();
        $("main").hide();
        $("#toggle").hide();
        $("#togglethis").hide();
    });

var imageurlsmall = "https://image.tmdb.org/t/p/w200";
var urlimglarge = "https://image.tmdb.org/t/p/w500"

function getInput() {
    var query = $('#search').val();
    return query;
}

function clearLists () {
    var recommendedList = $('#recommended');
    
    recommendedList.text(' ');
}

function nowPlaying() {
     var xhr = new XMLHttpRequest();
     xhr.open("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key=3daaa224d520ad43baab7a6b2c604dca&language=en-US&page=1", false);
     xhr.send();
    console.log(xhr.status); // if this returns 200, then you are in like Flynn
    var moviePopular = JSON.parse(xhr.responseText);
    console.log(moviePopular);
    
    for (x=0; x < 5; x++) {
        var popular = $("#nowplaying");
        
        var image = '<img src="' +  imageurlsmall + moviePopular.results[x].poster_path + '">';
        
        console.log (moviePopular.results[x].original_title);
        
        var nowPlaying = popular.append("<a href='#' onclick='getMovie(\"" + moviePopular.results[x].original_title + "\")'>" + '<p class="col span_2_of_12">' + moviePopular.results[x].original_title + image + '</p>' + "</a>");
        
    }
}



function recommendMovie(movie) {
    var movieID = movie.results["0"].id;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.themoviedb.org/3/movie/" + movieID + "/recommendations?api_key=3daaa224d520ad43baab7a6b2c604dca&language=en-US&page=1", false);
    xhr.send();
    console.log(xhr.status); // if this returns 200, then you are in like Flynn
    var movieDiscover = JSON.parse(xhr.responseText);
    
    clearLists();
    
    for (x=0; x < 5; x++) {
        var discover = $("#recommended");
        
        var image = '<img src="' +  imageurlsmall + movieDiscover.results[x].poster_path + '">';
        
        var recommend = discover.append("<a href='#' onclick='getMovie(\"" + movieDiscover.results[x].original_title + "\")'>" +'<p class="col span_2_of_12">' + movieDiscover.results[x].original_title + image + '</p>' + "</a>");

    }   
}

function getMovie(input) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.themoviedb.org/3/search/movie?api_key=3daaa224d520ad43baab7a6b2c604dca&query=" + input, false);
    xhr.send();
    console.log(xhr.status); // if this returns 200, then you are in like Flynn
    var movieObject = JSON.parse(xhr.responseText);
    console.log(movieObject);

    $("main").show();
    $("#nowplaying").hide();
    $("#movietitle").text(movieObject.results["0"].original_title);
    $("#poster").attr("src", urlimglarge + movieObject.results["0"].poster_path);
    $("#date").text(movieObject.results["0"].release_date);
    $("#overview").text(movieObject.results["0"].overview);
    $("#language").text(movieObject.results["0"].original_language);
    $("#popularity").text(movieObject.results["0"].vote_average);
    $("#genre").text(movieObject.results["0"].genre_ids);
    
    for (x=0; x < 5; x++) {
        var options = $(".otherMovies");
        
        var recommend = options.append("<a href='#' onclick='getMovie(\"" + movieObject.results[x].original_title + "\")'>" +'<li>' + movieObject.results[x].original_title + '</li>' + "</a>");

    }
    recommendMovie(movieObject);
    
}

//Hides "Not the right movie?" and alternate movie options 
//unless you search for something


//When you click the search button, "Not the right movie?" shows
$("#trigger").on("click", function () {
    $("#toggle").show();
    $("#togglethis").hide();
});

//When you click "Not the right movie?", alternate options show
$("#toggle").on("click", function() {
    $("#toggle").next().slideToggle("ul");
});

//When you click enter, search bar is clicked
$(document).keypress(function(e){
            if (e.which == 13){
                $("#trigger").click();
            }
        });

$("#copyright").text(new Date().getFullYear());