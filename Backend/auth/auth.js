/**
* @description: 
* @file: auth.js
* @author: Vedant Nare
* @version: 1.0
*/ 

var jwt = require('jsonwebtoken');
var cache = require('../services/cacheService');
var userModel = require('../models/userModel');
const logger = require('../services/logService');

/**
* @description generateToken is used for generating a json web token.
*/

let generateToken = (payload) =>
{
  let token = jwt.sign(payload, 'secret',{ expiresIn: '12h'});
  return token;
}

/**
* @description checkToken is used for verifying a json web token.
*/

let checkToken = (req,res,next) =>
{   
    if(req.headers.token == undefined)
    {
        return res.status(422).send({message:"No token found"});
    }
    else
    {
        let path = req._parsedUrl.pathname.slice(1);
        let bearerHeader = req.headers.token;
        req.authenticated = false;
        jwt.verify(bearerHeader, 'secret', function (err, decoded)
        {
            if (err)
            {
                logger.error('Error',err);
                req.authenticated = false;
                req.decoded = null;
                res.status(422).send(err);
            } 
            else 
            {
                cache.exist(decoded.id+path,(fail,success)=>
                {
                    if(fail)
                    {
                        logger.error(fail);
                        res.status(422).send(fail);
                    }     
                    else
                    {
                        cache.get(decoded.id+path,(error,reply)=>
                        {
                            if(error)
                            {
                                logger.error(error);
                                res.status(422).send(error);
                            }
                            else
                            {
                                let keyToken = reply;
                                // logger.info(keyToken);
                                // logger.info(bearerHeader);
                                if(keyToken == bearerHeader)
                                {
                                    logger.info('Tokens matched');
                                    req.decoded = decoded;
                                    req.authenticated = true;
                                    next();
                                }
                            }
                        });
                    }                                  
                });
            }
        });
    }   
}

/**
* @description verificationToken is used for verifying email verification web token.
*/

let verificationToken = (req,res,next) =>
{  
    let bearerHeader = req.params.url;
    userModel.findOne({urlCode:bearerHeader})
    .then(data=>
    {   
        if(data === null)
        {
            let response = {message:"No data found"};
            res.status(422).send(response);
        }
        else
        {
            let url = data.longUrl.slice(22);
            jwt.verify(url, 'secret', (err, decoded)=>
            {
                if (err)
                {
                    logger.error('Error',err);
                    req.authenticated = false;
                    req.decoded = null;
                    res.status(422).send(err);
                }
                else
                {
                    cache.exist(decoded.id+'verify',(fail,success)=>
                    {
                        if(fail)
                        {
                            logger.error(fail);
                            let failure = {
                                error:fail,
                                message:'Token does not exist'
                            }
                            return res.status(422).send(failure);
                        }     
                        else
                        {
                            cache.get(decoded.id+'verify',(error,reply)=>
                            {
                                if(error)
                                {
                                    logger.error(error);
                                    res.status(422).send(error);
                                }
                                else
                                {
                                    let keyToken = reply;
                                    // logger.info(keyToken);
                                    // logger.info(url);
                                    if(keyToken == url)
                                    {
                                        logger.info('Verification Tokens matched');
                                        req.decoded = decoded;
                                        req.authenticated = true;
                                        next();
                                    }
                                }
                            });
                        }                                  
                    })
                } 
            }); 
        }
           
    })
    .catch(err=>
    {
        res.status(422).send(err);
    })        
}

module.exports={checkToken,generateToken,verificationToken}