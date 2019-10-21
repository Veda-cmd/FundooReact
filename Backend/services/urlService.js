/**
* @description: 
* @file: urlService.js
* @author: Vedant Nare
* @version: 1.0
*/

/**
*@description Dependencies are installed for execution. 
*/

const validUrl = require('valid-url');
const shortid = require('shortid');
const auth = require('../auth/auth');
const userModel = require('../models/userModel');

class urlService
{
    /**
    *@description Url is shortened using shortid and stored in Url database. 
    */

    shortenUrl(req, callback)
    {
        const baseUrl = req.url;
        const urlCode = shortid.generate();
        if (validUrl.isUri(baseUrl)) 
        {
            try 
            {
                userModel.findOne({email:req.email})
                .then(data=>
                {
                    // console.log('data',data);
                    let token = auth.generateToken({email:req.email});
                    const longUrl = baseUrl + token;
                    const shortUrl = baseUrl + urlCode;
                    userModel.update({_id:data._id},{longUrl:longUrl,shortUrl:shortUrl,urlCode:urlCode},(err,res)=>
                    {
                        if(err)
                            callback(err);
                        else
                        {
                            let response = {
                                success:true,
                                shortUrl:shortUrl,
                                email: data.email,
                                message:'User registered in database'
                            };
                            callback(null,response);
                        }
                    })
                    
                })
                .catch(err=>
                {
                    callback(err)    
                })  
            } 
            catch (err) {
                let res ={
                success:false,
                message:"Server error"};
                console.error(err);
                callback(res);
            }
        } 
        else 
        {
            callback({message:'Invalid base url'});
        }
    }

    /**
    *@description User is verified and flag is set to true for the particular user in User database. 
    */

    verifyUrl(req,callback)
    {   
        userModel.findOne({urlCode:req.params.url})
        .then(data=>
        {
            userModel.update({email:data.email},{isVerified:true},(error,result)=>
            {
                if(error)
                    callback(error);
                else
                {
                    let res={message:'Updated Flag Value'}
                    callback(null,res);
                }        
            });
        })
        .catch(err=>
        {
            callback(err)
        })

    }
}

module.exports=new urlService();