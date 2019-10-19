/**
* @description: 
* @file: urlModel.js
* @author: Vedant Nare
* @version: 1.0
*/ 

/**
*@description Dependencies are installed for execution. 
*/

const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    email:String,
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    date: { type: String, 
        default: Date.now }
});

/**
*@description Schema is defined for storing object in database. 
*/

const Url = mongoose.model('url', urlSchema);

module.exports = Url;