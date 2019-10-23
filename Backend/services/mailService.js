/**
* @description: 
* @file: mailService.js
* @author: Vedant Nare
* @version: 1.0
*/

/**
*@description Dependencies are installed for execution. 
*/

require('dotenv').config();
const nodemailer = require('nodemailer');
const logger = require('./logService');

/**
*@description Nodemailer is used for sending mail. 
*/

sendForgotLink = (url,req) =>
{   
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: process.env.email_id,
        pass: process.env.password
        } 
    });

    let mailOptions = {
        from: process.env.email_id,
        to: req,
        subject: 'Reset Password Link',
        text: 'Click on the following link to reset Fundoo password.Link will be active for 12 hours.\n'+url
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error)
            logger.info(error);
        else
            logger.info('Email sent: ' + info.response);
    });
}

sendVerifyLink = (url,req) =>
{   
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: process.env.email_id,
        pass: process.env.password
        } 
    });

    let mailOptions = {
        from: process.env.email_id,
        to: req,
        subject: 'Verification link',
        text: 'Click on the following link to verify Fundoo account.\n'+url
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error)
            logger.error(error);
        else
            logger.info('Email sent: ' + info.response);
    });
}

module.exports = {sendForgotLink,sendVerifyLink};