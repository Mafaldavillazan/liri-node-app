//REQUIRES
//Requiring the pacakge dotenv
require("dotenv").config();
// Grab axios package to link apis of OMDB and Bands in Twon
var axios = require("axios")
//Create a variable key that calls the document of keys
var keys = require("./keys.js");
//Moment for changing the time
var moment = require("moment")
//Requiring spotify
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify)
//Require FS for files
var fs = require("fs")

//USER INPUTS
//What the user asks liri to search for
var userAsks = process.argv[2];
//get the name of that particular thing they want to search
var userSelection = process.argv[3];

//TRANSLATING
//Make the user inputs actions that search on the APIs
switch (userAsks) {
    //CONCERT THIS
    case "concert-this":
        concertThis()
        break;

    //SONG SEARCH
    case "spotify-this-song":
        spotifyThis(userSelection)
        break;

    //MOVIE SEARCH
    case "movie-this":
        movieThis()
        break;

    //DO WHAT IT SAYS
    case "do-what-it-says":
        //call the random.txt
        //userSelection = "Adele"
        doWhatItSays()
        break;

}


//FUNCTIONS
function spotifyThis(userSelection) {
    spotify.search({ type: 'track', query: userSelection, limit: 2 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        else {
            var artist = data.tracks.items[0].album.artists[0]["name"]
            var songName = userSelection
            var linkSpotify = data.tracks.items[0].album.artists[0].external_urls["spotify"]
            //wasn't able to find the album in a readable way, this result if serched it links to the album
            var albumSong = data.tracks.items[0].album["uri"]

            console.log("-------Here  you have the info of " + userSelection + " song-------")
            console.log("The name of the artist: " + artist
                + "\nThe name of the song: " + songName
                + "\nThe link to the song: " + linkSpotify
                + "\nThe album of the song: " + albumSong)
            console.log("---------------------------------------------------------------")
        }

    });
}


function concertThis() {
    axios
        .get("https://rest.bandsintown.com/artists/" + userSelection + "/events?app_id=d7e548f4-f02a-4448-8c03-1ebac3b0b32e")
        .then(function (response) {
            //Creating variables that only take the information from the API we want to showcase
            //console.log(response.data[0])
            var venueName = response.data[0].venue["name"]
            var venueLocation = response.data[0].venue["country"]
            var eventDate = response.data[0]["datetime"]
            var stringDate = eventDate.toString()
            //**** Not able to use moment to change the code */
            //moment(stringDate, 'DD.MM.YYYY').format('YYYY/MM/DD')
            //Displaying the information
            console.log("-------Here  you have the info of " + userSelection + " next concert-------")
            console.log("The name of the venue is: " + venueName
                + "\nThe location of the event is: " + venueLocation
                + "\nThe day of the event is: " + stringDate)
            console.log("---------------------------------------------------------------")
        })
}


function movieThis() {
    //If they don't input any data
    if (!userSelection) {
        userSelection = "Mr.Nobody"
        axios
            .get("http://www.omdbapi.com/?t=" + userSelection + "&apikey=f94feda2")
            .then(function (response) {
                var titleFilm = response.data["Title"]
                var yearFilm = response.data["Year"]
                var countryFilm = response.data["Country"]
                var plotFilm = response.data["Plot"]
                var actorsFilm = response.data["Actors"]
                var ratingIMDBFilm = response.data.Ratings[0]["Value"]
                var ratingTomatoesFilm = response.data.Ratings[1]["Value"]
                //console.log(response.data);

                console.log("-------You didn't provide Info, but-------")
                console.log("If you haven't watched " + userSelection + " then you should: <http://www.imdb.com/title/tt0485947/>"
                    + "\nIts on Netflix!")
                console.log("\nThe title of the movie: " + titleFilm
                    + "\nThe year the movie came out: " + yearFilm
                    + "\nThe Country where it was produced: " + countryFilm
                    + "\nThe plot of the film: " + plotFilm
                    + "\nThe actors in the film: " + actorsFilm)
                console.log("\n*** Ratings ***"
                    + "\nIMDB: " + ratingIMDBFilm
                    + "\nRooten tomatoes: " + ratingTomatoesFilm)
                //console.log("\nThe Rating in rating at IMDB: " + ratingFilm)
                console.log("---------------------------------------------------------------")
            })
    }
    //When the user inputs information
    else {
        axios
            .get("http://www.omdbapi.com/?t=" + userSelection + "&apikey=f94feda2")
            .then(function (response) {
                var titleFilm = response.data["Title"]
                var yearFilm = response.data["Year"]
                var countryFilm = response.data["Country"]
                var plotFilm = response.data["Plot"]
                var actorsFilm = response.data["Actors"]
                var ratingIMDBFilm = response.data.Ratings[0]["Value"]
                var ratingTomatoesFilm = response.data.Ratings[1]["Value"]
                //console.log(response.data);

                console.log("-------Here  you have the info you asked for-------")
                console.log("\nThe title of the movie: " + titleFilm
                    + "\nThe year the movie came out: " + yearFilm
                    + "\nThe Country where it was produced: " + countryFilm
                    + "\nThe plot of the film: " + plotFilm
                    + "\nThe actors in the film: " + actorsFilm)
                console.log("\n*** Ratings ***"
                    + "\nIMDB: " + ratingIMDBFilm
                    + "\nRooten tomatoes: " + ratingTomatoesFilm)
                //console.log("\nThe Rating in rating at IMDB: " + ratingFilm)
                console.log("---------------------------------------------------------------")
            })
    }
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data)

        var dataArr = data.split(",");
        //console.log(dataArr)
        //Switch statment so we tak the random selection
        switch (dataArr[0]) {
            case "spotify-this-song":
                userSelection = dataArr[1]
                spotifyThis(userSelection)
                break;
        }

    })
}