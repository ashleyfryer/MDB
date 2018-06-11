$(window).on("load", function() {
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

function clearLists() {
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

  for (x = 0; x < 5; x++) {
    var popular = $("#nowplaying");

    var image = '<img src="' + imageurlsmall + moviePopular.results[x].poster_path + '">';

    console.log(moviePopular.results[x].title);

    var nowPlaying = popular.append("<a href='#' onclick='getMovie(\"" + moviePopular.results[x].title + "\")'>" + '<p class="col span_2_of_12">' + moviePopular.results[x].title + image + '</p>' + "</a>");

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

  for (x = 0; x < 5; x++) {
    var discover = $("#recommended");

    var image = '<img src="' + imageurlsmall + movieDiscover.results[x].poster_path + '">';

    var recommend = discover.append("<a href='#' onclick='getMovie(\"" + movieDiscover.results[x].title + "\")'>" + '<p class="col span_2_of_12">' + movieDiscover.results[x].title + image + '</p>' + "</a>");

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
  $("#movietitle").text(movieObject.results["0"].title);
  $("#poster").attr("src", urlimglarge + movieObject.results["0"].poster_path);
  $("#date").text(movieObject.results["0"].release_date);
  $("#overview").text(movieObject.results["0"].overview);
  var lang = movieObject.results["0"].original_language;
  switch (lang) {
    case 'en':
      $("#language").text("English");
      break;
    case 'es':
      $("#language").text("Spanish");
      break;
    case 'de':
      $("#language").text("German");
      break;
    case 'ru':
      $("#language").text("Russian");
      break;
    case 'fr':
      $("#language").text("French");
      break;
    case 'ja':
      $("#language").text("Japanese");
      break;
    case 'zh':
      $("#language").text("Chinese");
    break;
    case 'ko':
      $("#language").text("Korean");
    break;
  }


      $("#popularity").text(movieObject.results["0"].vote_average);
      $("#genre").text("");
      var genre = movieObject.results["0"].genre_ids;
      for (var c = 0; c < genre.length; c++) {
        switch (genre[c]) {
          case 28:
            $("#genre").append("Action ");
            break;
          case 12:
            $("#genre").append("Adventure ");
            break;
          case 16:
            $("#genre").append("Animation ");
            break;
          case 35:
            $("#genre").append("Comedy ");
            break;
          case 80:
            $("#genre").append("Crime ");
            break;
          case 99:
            $("#genre").append("Documentary ");
            break;
          case 18:
            $("#genre").append("Drama ");
            break;
          case 10751:
            $("#genre").append("Family ");
            break;
          case 14:
            $("#genre").append("Fantasy ");
            break;
          case 36:
            $("#genre").append("History ");
            break;
          case 27:
            $("#genre").append("Horror ");
            break;
          case 10402:
            $("#genre").append("Music ");
            break;
          case 9648:
            $("#genre").append("Mystery ");
            break;
          case 10749:
            $("#genre").append("Romance ");
            break;
          case 878:
            $("#genre").append("Science Fiction ");
            break;
          case 10770:
            $("#genre").append("TV Movie ");
            break;
          case 53:
            $("#genre").append("Thriller ");
            break;
          case 10752:
            $("#genre").append("War ");
            break;
          case 37:
            $("#genre").append("Western ");
            break;
        }
      }

      for (var x = 0; x < 5; x++) {
        var options = $(".otherMovies");

        var recommend = options.append("<a href='#' onclick='getMovie(\"" + movieObject.results[x].title + "\")'>" + '<li>' + movieObject.results[x].title + '</li>' + "</a>");

      }
      recommendMovie(movieObject);

  }

  //Hides "Not the right movie?" and alternate movie options
  //unless you search for something


  //When you click the search button, "Not the right movie?" shows
  $("#trigger").on("click", function() {
    $("#toggle").show();
    $("#togglethis").hide();
  });

  //When you click "Not the right movie?", alternate options show
  $("#toggle").on("click", function() {
    $("#toggle").next().slideToggle("ul");
  });

  //When you click enter, search bar is clicked
  $(document).keypress(function(e) {
    if (e.which == 13) {
      $("#trigger").click();
    }
  });

  $("#copyright").text(new Date().getFullYear());
