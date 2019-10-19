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

class Userservice
{ 
    register(req)
    {
        return new Promise((resolve,reject)=>
        {
            userModel.register(req,(err,result)=>
            {
                if(err)
                    reject(err)
                else
                    resolve(result)
            })
        })
    }

    login(req,callback)
    {   
        userModel.login(req,(err,data)=>
        {
            if(err)
                callback(err)          
            else
                callback(null,data);
        });
    }

    forgot(req)
    {
        return new Promise((resolve,reject)=>
        {
            userModel.forgot(req)
            .then(data=>
            {
                resolve(data);
            })
            .catch(err=>
            {
                reject(err);
            })
        })
    }

    reset(req)
    {
        return new Promise((resolve,reject)=>
        {   
            userModel.reset(req)
            .then(data=>
            {
                resolve(data);
            })
            .catch(err=>
            {
                reject(err);
            })
        })
    }
}

module.exports = new Userservice();