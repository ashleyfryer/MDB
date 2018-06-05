$(window).on( "load", function() {
        nowPlaying();
        $("main").hide();
    });

var imageurlsmall = "https://image.tmdb.org/t/p/w200";
var urlimglarge = "https://image.tmdb.org/t/p/w500"

function getInput() {
    var query = $('#search').val();
    return query;
}

function nowPlaying() {
     var xhr = new XMLHttpRequest();
     xhr.open("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key=3daaa224d520ad43baab7a6b2c604dca&language=en-US&page=1", false);
     xhr.send();
    console.log(xhr.status); // if this returns 200, then you are in like Flynn
    var moviePopular = JSON.parse(xhr.responseText);
    console.log(moviePopular);

    $("#popular").text(moviePopular.results["0"].original_title);
    $("#popularimg").attr("src", imageurlsmall + moviePopular.results["0"].poster_path);
    $("#popular1").text(moviePopular.results["1"].original_title);
    $("#popular1img").attr("src", imageurlsmall + moviePopular.results["1"].poster_path);
    $("#popular2").text(moviePopular.results["2"].original_title);
    $("#popular2img").attr("src", imageurlsmall + moviePopular.results["2"].poster_path);
    $("#popular3").text(moviePopular.results["3"].original_title);
    $("#popular3img").attr("src", imageurlsmall + moviePopular.results["3"].poster_path);
    $("#popular4").text(moviePopular.results["4"].original_title);
    $("#popular4img").attr("src", imageurlsmall + moviePopular.results["4"].poster_path);
}

function recommendMovie(movie) {
    var movieID = movie.results["0"].id;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.themoviedb.org/3/movie/" + movieID + "/recommendations?api_key=3daaa224d520ad43baab7a6b2c604dca&language=en-US&page=1", false);
    xhr.send();
    console.log(xhr.status); // if this returns 200, then you are in like Flynn
    var movieDiscover = JSON.parse(xhr.responseText);

    $("#related").text(movieDiscover.results["0"].original_title);
    $("#relatedimg").attr("src", imageurlsmall + movieDiscover.results["0"].poster_path);
    $("#related1").text(movieDiscover.results["1"].original_title);
    $("#related1img").attr("src", imageurlsmall + movieDiscover.results["1"].poster_path);
    $("#related2").text(movieDiscover.results["2"].original_title);
    $("#related2img").attr("src", imageurlsmall + movieDiscover.results["2"].poster_path);
    $("#related3").text(movieDiscover.results["3"].original_title);
    $("#related3img").attr("src", imageurlsmall + movieDiscover.results["3"].poster_path);
    $("#related4").text(movieDiscover.results["4"].original_title);
    $("#related4img").attr("src", imageurlsmall + movieDiscover.results["4"].poster_path);
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

    recommendMovie(movieObject);
}

$(document).keypress(function(e){
            if (e.which == 13){
                $("#trigger").click();
            }
        });