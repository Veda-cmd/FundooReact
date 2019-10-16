const userModel = require('../models/userModel');

class Userservice
{ 
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