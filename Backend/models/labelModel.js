/**
* @description: 
* @file: labelModel.js
* @author: Vedant Nare
* @version: 1.0
*/ 

/**
*@description Dependencies are installed for execution. 
*/

const mongoose = require('mongoose');
const logger = require('../services/logService');

/**
*@description Label schema is defined for storing labels in database.
*/

const labelSchema = mongoose.Schema({
    label_name:{
        type:String,
        required:true
    }
});

/**
*@description Label Model is defined for storing object in database. 
*/

const Label = mongoose.model('label',labelSchema);

class labelModel
{
    /**
    *@description labelModel has the following functions:
    * findOne: for finding a particular record from database. It takes a single parameter.
    * findAll: for retrieving list of existing records from database.
    * update: for updating label field in database.
    * addLabel: for saving label object in note collection. 
    */

    findOne(req)
    {
        return new Promise((resolve,reject)=>
        {
            Label.findOne(req)
            .then(data=>
            {
                // logger.info(data); 
                resolve(data);
            })
            .catch(err=>
            {
                logger.error(err);
                reject(err);
            });
        });
    }

    findAll(req,callback)
    {
        Label.find(req,(err,data)=>
        {
            if(err)
            {
                callback(err);
            }   
            else
            {    
                if(data.length != 0)
                {
                    callback(null,data);
                }
                else
                {
                    callback({message:"No data found"});
                }    
            }        
        });
    }

    update(req,res,callback)
    {   
        // logger.info(req,res);
        
        Label.updateOne(req,res)
        .then(data=>
        {
            // logger.info(data);
            callback(null,data);
        })
        .catch(err=>
        {
            callback(err);
        });
    
    }

    addLabel(req,callback)
    {
        const label = new Label({
            label_name:req.label_name
        });
        label.save((err,data)=>
        {
            if(err)
            {
                callback(err);
            }
            else
            {
                let res ={
                    id:data._id,
                    message:"Label created successfully"
                }
                callback(null,res);
            }
        });
    }
}

module.exports = new labelModel();

