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
}

module.exports = new Userservice();