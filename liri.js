//REQUIRES
//Requiring the pacakge dotenv
require("dotenv").config();
// Grab axios package to link apis of OMDB and Bands in Twon
var axios = require("axios")
//Create a variable key that calls the document of keys
var keys = require("./keys.js");
//Moment for changing the time
var moment = require("moment")


//var spotify = new Spotify(keys.spotify)
//USER INPUTS
//What the user asks liri to search for
var userAsks = process.argv[2];
//get the name of that particular thing they want to search
var userSelection = process.argv[3];


//Make the user inputs actions that search on the APIs
switch (userAsks) {

    //CONCERT THIS
    case "concert-this":
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
        break;

    //SONG SEARCH
    case "spotify-this-song":

        break;

    //MOVIE SEARCH
    case "movie-this":
        axios
            .get("http://www.omdbapi.com/?t=" + userSelection + "&apikey=f94feda2")
            .then(function (response) {
                var titleFilm = response.data["Title"]
                var yearFilm = response.data["Year"]
                //var ratingFilm = response.data["Ratings"]
                var countryFilm = response.data["Country"]
                var plotFilm = response.data["Plot"]
                var actorsFilm = response.data["Actors"]
                console.log(response.data);

                console.log("-------Here  you have the info you asked for-------")
                console.log("\nThe title of the movie: " + titleFilm 
                + "\nThe year the movie came out: " + yearFilm 
                + "\nThe Country where it was produced: " + countryFilm
                + "\nThe plot of the film: " + plotFilm
                + "\nThe actors in the film: " + actorsFilm)
    
                //console.log("\nThe Rating in rating tomatoes: " + ratingFilm)
                //console.log("\nThe Rating in rating at IMDB: " + ratingFilm)
                console.log("---------------------------------------------------------------")
            })

        break;

    //DO WHAT IT SAYS
    case "do-what-it-says":

        break;

}