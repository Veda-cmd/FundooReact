/**
* @description: 
* @file: config.js
* @author: Vedant Nare
* @version: 1.0
*/ 

require('dotenv').config();
module.exports = {
    url: process.env.url,
    port:process.env.port
}