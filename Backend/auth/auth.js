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

generateToken = (payload) =>
{
  let token = jwt.sign(payload, 'secret',{ expiresIn: '12h'});
  return token;
}

/**
* @description checkToken is used for verifying a json web token.
*/

checkToken = (req,res,next) =>
{   
    
    if(req._parsedUrl.pathname == '/reset')
    {
        var bearerHeader = req.headers.token;
        req.authenticated = false;
        if (bearerHeader)
        {
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
                    cache.exist(decoded.id+'forgot',(fail,success)=>
                    {
                        if(fail)
                        {
                            logger.error(fail);
                            res.status(422).send(fail);
                        }     
                        else
                        {
                            // console.log('Success',success); 
                            cache.get(decoded.id+'forgot',(error,reply)=>
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
                                        logger.info('Reset Tokens matched');
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
        else
        {
            res.status(422).send({"message":"Token not found"});
        }
    }
    else if(req._parsedUrl.pathname == '/api/upload')
    {      
        let bearerHeader = req.query.token;
        jwt.verify(bearerHeader,'secret',(err,decoded)=>
        {
            if(err)
            {
                logger.error('Error',err);
                req.authenticated = false;
                req.decoded = null;
                res.status(422).send(err);
            }
            else
            {
                cache.exist(decoded.email+'login',(fail,success)=>
                {
                    if(fail)
                    {
                        logger.error(fail);
                        let failure = {
                            error:fail,
                            message:'Token does not exist'
                        }
                        res.status(422).send(failure);
                    }     
                    else
                    {
                        cache.get(decoded.email+'login',(error,reply)=>
                        {
                            if(error)
                            {
                                logger.error(error);
                                res.status(422).send(error);
                            }
                            else
                            {
                                let keyToken = reply;
                                // logger.info(`Reply,${keyToken}`);
                                // logger.info(`${bearerHeader}`);
                                if(keyToken == bearerHeader)
                                {
                                    logger.info('User authorized');
                                    req.decoded = decoded;
                                    req.authenticated = true;
                                    next();
                                }
                            }
                        });
                    }                                  
                })
            }
        })

    }
    else
    {
        let bearerHeader = req.params.url;
        userModel.findOne({urlCode:bearerHeader})
        .then(data=>
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
                            res.status(422).send(failure);
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
        })
        .catch(err=>
        {
            res.status(422).send(err);
        })    
    }
    
}
module.exports={checkToken,generateToken}