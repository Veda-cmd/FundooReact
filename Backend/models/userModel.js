const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const util = require('../services/utilService');

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
    verify_value:{
        type: Boolean,
        required:false
    },
    forgot_token:{ 
        type:String,
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
    findOne(req)
    {
        return new Promise((resolve,reject)=>
        {
            // console.log(req.forgot_token);
            User.findOne(req)
            .then(data=>
            {
                // console.log('Data',data); 
                resolve(data);
            })
            .catch(err=>
            {
                console.log(err);
                reject(err);
            })
        })
    }

    findAll(req,callback){
        User.find({},(err,data)=>
        {
            if(err)
                callback(err);
            else
                callback(null,data);
        })
    }

    updateToken(req,callback)
    {     
        User.updateOne({email:req.email},{$set:{forgot_token:req.token}})
        .then(data=>
        {
            callback(null,data);
        })
        .catch(err=>
        {
            callback(err);
        })
       
    }

    updateFlag(req,callback)
    {     
        User.updateOne({email:req.email},{$set:{verify_value:true}})
        .then(data=>
        {
            let message={message:'Updated flag value'};
            callback(null,message);
        })
        .catch(err=>
        {
            callback(err);
        })
       
    }

    register(req,callback)
    {
        this.findOne({email:req.email})
        .then(data=>
        {
            if(data)
                callback({message:"Email already registered"});
            else
            {
                let hash = util.hashPassword(req.password);
                hash.then(data=>
                {
                    const user = new User({
                        firstName:req.firstName,
                        lastName:req.lastName,
                        email:req.email,
                        password:data
                    })
                    user.save((err,result)=>
                    {
                        if(err)
                            callback(err)
                        else
                        {
                            let response = {
                                email:result.email,
                                success:true,
                            }
                            callback(null,response)
                        }
                            
                    })
                })
            }    
        })
        .catch(err=>
        {
            callback(err);
        })    
    }

    login(req,callback)
    {   
        this.findOne({email:req.email})
        .then(data=>
        {    
            if(data.verify_value)
            {
                bcrypt.compare(req.password,data.password,(err,result)=>
                {
                    if(err)
                        callback(err);
                    else if(result)
                    {
                        let response = 
                        {
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
            else
            {
                callback({message:'User account is not verified yet.Please check mail for verification link'})
            }
        })
        .catch(err=>
        {
            callback(err);
        })
    }

    forgot(req)
    {
        return new Promise((resolve,reject)=>
        {
            this.findOne({email:req.email})
            .then(data=>
            {
                let result={
                    email:data.email,
                    firstName:data.firstName,
                    success:true,
                    message:"Success"
                }
                resolve(result);
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
            this.findOne({forgot_token:req.token})
            .then(data=>
            {    
                bcrypt.compare(req.old_password,data.password,(err,result)=>
                {   
                    if(err)
                        reject(err)
                    else if(result)
                    {
                        let hash = util.hashPassword(req.new_password);
                        hash.then(response=>
                        {
                            User.updateOne({_id:data._id},{$set:{password:response}})
                            .then(res=>
                            {
                                // console.log(res);
                                resolve({message:"Password updated"})
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
                        console.log('Passwords do not match. Please enter correct password');
                        reject({message:"Password updation failed"})
                    }

                });
                
            })
            .catch(err=>
            {
                console.log('In error')
                reject(err);
            })
        }) 
    }
}

module.exports = new Usermodel(),User;