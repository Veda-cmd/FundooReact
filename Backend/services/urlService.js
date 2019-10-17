const validUrl = require('valid-url');
const shortid = require('shortid');
const auth = require('../auth/auth');
const Url = require('../models/urlModel');
const userModel = require('../models/userModel');

class urlService
{
    shortenUrl(req, callback)
    {
        const baseUrl = req.url;
        const urlCode = shortid.generate();
        if (validUrl.isUri(baseUrl)) 
        {
            try 
            {
                Url.findOne({email:req.email},(err,result)=>
                {
                    if(err)
                        callback(err)
                    else if (result)
                    {
                        let response =
                        {   
                            shortUrl:result.shortUrl,
                            email:result.email,
                            message:"User not verified yet"
                        }
                        callback(null,response);
                    }    
                    else 
                    {
                        let token = auth.generateToken({email:req.email});
                        const longUrl = baseUrl + token;
                        const shortUrl = baseUrl + urlCode;
                        const newUrl = new Url({
                            email:req.email,
                            longUrl:longUrl,
                            shortUrl:shortUrl,
                            urlCode:urlCode,
                            date: new Date()
                        });
                
                        newUrl.save((err,res)=>
                        {
                            if(err)
                            {
                                console.log('Error',err);
                                callback(err)
                            }   
                            else
                            {
                                console.log('Result');
                                callback(null,res)
                            }
                                
                        });
                    }
                });
                
            } 
            catch (err) {
                console.error(err);
                callback('Server error');
            }
        } 
        else 
        {
            callback('Invalid base url');
        }
    }

    verifyUrl(req,callback)
    {   
        Url.findOne({urlCode:req.params.url},(err,data)=>
        {
            if(err)
                callback(err)
            else
            {
                userModel.updateFlag(data,(error,result)=>
                {
                    if(error)
                        callback(error);
                    else
                        callback(null,result);
                });
            }
        });

    }
}

module.exports=new urlService();