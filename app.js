// Grab axios package to link apis of OMDB and Bands in Twon
var axios = require("axios")

//OMBD
axios
    .get("http://www.omdbapi.com/?t=dumbo&apikey=f94feda2")
    .then(function (response) {
        // If the axios was successful...
        // Then log the body from the site!
        console.log(response.data);
    })
// Bands in town
axios
    .get("https://rest.bandsintown.com/artists/adele?app_id=d7e548f4-f02a-4448-8c03-1ebac3b0b32e")
    .then(function (response) {
        // If the axios was successful...
        // Then log the body from the site!
        console.log(response.data);
    })

var moment = require("moment")
var spotify = require("node-spotify-api")
var dotEnv = require("dotenv")


