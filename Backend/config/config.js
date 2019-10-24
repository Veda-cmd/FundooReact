/**
* @description: 
* @file: config.js
* @author: Vedant Nare
* @version: 1.0
*/ 

require('dotenv').config();
module.exports = {
    url: process.env.url,
    port:process.env.port,
    user_key:process.env.IAM_USER_KEY,
    secret_key:process.env.IAM_USER_SECRET,
    bucket:process.env.BUCKET_NAME
}