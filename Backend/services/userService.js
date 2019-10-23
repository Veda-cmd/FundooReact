/**
* @description: 
* @file: userService.js
* @author: Vedant Nare
* @version: 1.0
*/

/**
*@description Dependencies are installed for execution. 
*/

const userModel = require('../models/userModel');
const util = require('./utilService');
const logger = require('./logService');

class Userservice
{ 
    register(req)
    {
        return new Promise((resolve,reject)=>
        {
            userModel.findOne({email:req.email})
            .then(data=>
            {
                // logger.info(data);
                
                if(data)
                    reject({message:"Email already registered"});
                else
                {
                    let hash = util.hashPassword(req.password)
                    hash
                    .then(data=>
                    {
                        let request = {
                            firstName:req.firstName,
                            lastName:req.lastName,
                            email:req.email,
                            password:data
                        }
                        userModel.register(request,(err,result)=>
                        {
                            if(err)
                                reject(err);
                            else
                                resolve(result);
                        }) 
                    })
                    .catch(err=>
                    {
                        reject(err);
                    })    
                }
            })
            .catch(err=>
            {
                logger.error('Err',err);
                reject(err);
            })
        })
    }

    login(req,callback)
    {   
        userModel.findOne({email:req.email})
        .then(data=>
        {
            // logger.info(data);
            // logger.info('data',data.verify_value);
            
            if(data.isVerified)
            {
                util.comparePassword(req.password,data.password,(err,result)=>
                {
                    if(err)
                        callback(err)
                    else if(result)
                    {
                        userModel.login(data,(err,res)=>
                        {
                            if(err)
                                callback(err)          
                            else
                                callback(null,res);
                        });
                    }
                    else
                    {
                        logger.error('Login failed');
                        callback({message:"Wrong password entered"});
                    }
                })
            }
            else
            {
                callback({message:'User is not verified yet.Please check mail'})
            }
            
        })
        .catch(err=>
        {
            console.log(err);
            callback({message:'User not found'})
        })
        
    }

    forgot(req)
    {
        return new Promise((resolve,reject)=>
        {
            userModel.findOne({email:req.email})
            .then(data=>
            { 
                if(data.isVerified == true)
                {
                    let result={
                        id:data._id,
                        email:data.email,
                        firstName:data.firstName,
                        success:true,
                        message:"Success"
                    }
                    resolve(result);
                }
                else
                {
                  reject({message:'User is not verified yet'});
                }
                
            })
            .catch(err=>
            {
                reject(err)
            })
           
        })
    }

    reset(req)
    {
        return new Promise((resolve,reject)=>
        {   
            userModel.findOne({forgot_token:req.token})
            .then(data=>
            {
                // logger.error(data);
                
                util.comparePassword(req.old_password,data.password,(err,result)=>
                {
                    if(err)
                        reject(err)
                    else if(result)
                    {
                        let hash = util.hashPassword(req.new_password);
                        hash.then(res=>
                        {
                            let request = {
                                _id:data._id,
                                password:res
                            }
                            userModel.reset(request)
                            .then(response=>
                            {
                                resolve(response)
                            })
                            .catch(err=>
                            {
                                reject(err)
                            })
                        })
                        .catch(err=>
                        {
                            reject(err)
                        })
                    }
                    else
                    {
                        reject({message:'Wrong password entered'});
                    }
                })
            })
            .catch(err=>
            {
                reject(err);
            })
        })
    }
}

module.exports = new Userservice();