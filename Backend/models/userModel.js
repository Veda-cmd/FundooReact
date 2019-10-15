const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    forgot_token:{
        type: String,
        required:false
    },
    created_at: {
        type: Date,
        default: Date.now 
    },
    updated_at: {
        type: Date,
        default: Date.now 
    }
   
});

const User =  mongoose.model('user',userSchema);

class Usermodel
{
    findOne(req,callback){
        User.findOne({email:req},(err,data)=>
        {
            if(err)
                callback(err);
            else
                callback(null,data);
        })
    }

    find(req,callback){
        User.find({},(err,data)=>
        {
            if(err)
                callback(err);
            else
                callback(null,data);
        })
    }

    hashPassword(req,callback)
    {
        bcrypt.hash(req,10,(err,data)=>
        {
            if(err)
                callback(err);
            else
                callback(data);
        })
    }

    login(req,callback)
    {   
        this.findOne(req.email,(err,data)=>
        {
            // console.log('Err',err,'Data',data); 
            if(err)
                callback(err)
            else
            {
                bcrypt.compare(req.password,data.password,(err,result)=>
                {
                    if(err)
                        callback(err);
                    else if(data)
                    {
                        let response = {
                            id:data._id,
                            firstName:data.firstName,
                            email:data.email,
                            message:'Success'
                        }
                        callback(null,response);
                    }   
                    else
                    {
                        console.log('Login failed');
                        callback({message:"Wrong password entered"});
                    }
                });
            }
                
        })
        
    }
}

module.exports = new Usermodel();