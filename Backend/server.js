/**
* @description: 
* @file: server.js
* @author: Vedant Nare
* @version: 1.0
*/ 

/**
*@description Dependencies are installed for execution. 
*/

// require('events').EventEmitter.defaultMaxListeners = 0;
const express = require('express');
const expressValidator = require('express-validator');
// create express app
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const route = require('./routes/routes');

//enables CORS
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(expressValidator())
// app.use(express.static('../client'))

app.use('/',route)

const config = require('./config/config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database

mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    // console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit(1);
});

// define a simple route
app.get('/', (req, res) => {
    res.status(200).send({message:"Hi there!"})
});


// listen for requests
app.listen(config.port, () => {
    console.log("Server is listening on port 5000");
});

module.exports=app;