/**
* @description: 
* @file: noteModel.js
* @author: Vedant Nare
* @version: 1.0
*/ 

/**
*@description Dependencies are installed for execution. 
*/

const mongoose = require('mongoose');
const logger = require('../services/logService');

/**
*@description User schema is defined for storing data in database.
*/

const noteSchema = mongoose.Schema({
    note_id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    reminder:{
        type:Array,
        required:false
    },
    color:{
        type:String,
        required:false
    },
    isArchived: {
        type:Boolean,
        required:false
    },
    isTrash: {
        type:Boolean,
        required:false
    }
});

/**
*@description Note Model is defined for storing object in database. 
*/

const Note = mongoose.model('note',noteSchema);

class noteModel
{
    /**
    *@description UserModel has the following functions:
    * findOne: for finding a particular record from database. It takes a single parameter.
    * findAll: for retrieving list of existing records from database.
    * update: for updating user field in database.
    * add: for saving note object in note collection. 
    */

    findOne(req)
    {
        return new Promise((resolve,reject)=>
        {
            Note.findOne(req)
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
        Note.find(req,(err,data)=>
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
        
        Note.updateOne(req,res)
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

    add(req,callback)
    {
        const note = new Note({
            note_id:req.note_id,
            title:req.title,
            description:req.description,
            reminder:req.reminder,
            color:req.color,
            isArchived:req.isArchived,
            isTrash:req.isTrash
        });
        note.save((err,data)=>
        {
            if(err)
            {
                callback(err);
            }
            else
            {
                let res ={
                    id:data._id,
                    title:note.title,
                    message:"Successfully created note"
                }
                callback(null,res);
            }
        });
    }

}

module.exports = new noteModel();
