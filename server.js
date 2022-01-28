// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Express and instance of app 
const express = require('express');  // instance of app
const cors = require('cors');
const bodyParser = require('body-parser'); //dependancies
const app = express();


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

const server = app.listen(port, listening);
//the callback function
function listening(){
    console.log(`Hello server : ${port}`);
}


//I use get function to intialize Routing
app.get('/allData', sendData);
function sendData(req, res){
    res.send(projectData);
     // clear projectData array
    projectData = [];
}

//I use post function to send data to server
app.post('/addData', addData);

function addData(req, res){
    
   weatherData = {
        date: req.body.date,
        temp: req.body.temp, 
        content: req.body.content
    }
//show data on terminal
    console.log(req.body);
//add "weatherData"Object to projectData array
   projectData.push(weatherData);
}

