require('dotenv').config();
const nodemailer = require('nodemailer');

sendLink = (url,req) =>
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
        subject: 'Forget password link',
        text: 'Click on the following link to reset.\n'+url
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error)
            console.log(error);
        else
            console.log('Email sent: ' + info.response);
    });
}

module.exports = {sendLink};