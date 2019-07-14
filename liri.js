//Requiring the pacakge dotenv
require("dotenv").config();

// Grab axios package to link apis of OMDB and Bands in Twon
var axios = require("axios")

//Create a variable key that calls the document of keys
var keys = require("./keys.js");

//var spotify = new Spotify(keys.spotify)

//USER INPUTS
var userAsks = process.argv[2];
var userSelection = process.argv[3];


//Make the user inputs actions that search on the APIs
switch (userAsks) {
    //CONCERT THIS
    case "concert-this":
        axios
            .get("https://rest.bandsintown.com/artists/" + userSelection + "?app_id=d7e548f4-f02a-4448-8c03-1ebac3b0b32e")
            .then(function (response) {
                console.log(response.data);
            })
        break;
}