/**
* @description: 
* @file: auth.js
* @author: Vedant Nare
* @version: 1.0
*/ 

var jwt = require('jsonwebtoken');

/**
* @description generateToken is used for generating a json web token.
*/

generateToken = (payload) =>
{
  let token = jwt.sign(payload, 'secret',{ expiresIn: '1h'});
  return token;
}

/**
* @description checkToken is used for verifying a json web token.
*/

checkToken = (req,res,next) =>
{   
    // console.log(req.headers);
    
    var bearerHeader = req.headers.token;
    req.authenticated = false;
    if (bearerHeader)
    {
        jwt.verify(bearerHeader, 'secret', function (err, decoded){
            if (err){
                console.log('Error',err);
                req.authenticated = false;
                req.decoded = null;
                res.status(400).send(err);
            } else {
                // console.log('Success');
                req.decoded = decoded;
                req.authenticated = true;
                next();
            }
        });
    }
    else
    {
        res.status(400).send({"message":"Token not found"});
    }
}
module.exports={checkToken,generateToken}