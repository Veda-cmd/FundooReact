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
*@description Note schema is defined for storing notes in database.
*/

const noteSchema = mongoose.Schema({
    user_id:{
        type:String,
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
    label:[{ type: mongoose.Schema.Types.ObjectId, ref: 'label' }],
    reminder:{
        type:String,
        required:false
    },
    color:{
        type:String,
        required:false
    },
    isPinned: {
        type:Boolean,
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
    * update: for updating note field in database.
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
                logger.error("Error in find");
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
                callback(null,data);  
            }        
        });
    }

    findAndPopulate(req,res,callback)
    {
        Note.find(req).populate({path:'label',match:{label_name:res.search}})
        .exec((err,data)=>
        {
            if(err)
            {
                callback(err);
            }
            else
            {
                let result =  data.filter((item)=>                
                {
                    return item.label.length!=0;
                });
                callback(null,result);
            }
        });
    }

    updateOne(req,res,callback)
    { 
        Note.updateOne(req,res)
        .then(data=>
        {
            console.log('data',data);
            callback(null,data);
        })
        .catch(err=>
        {
            callback(err);
        });
    }

    updateMany(req,res,callback)
    { 
        Note.updateMany(req,res)
        .then(data=>
        {
            console.log('data',data);
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
            user_id:req.user_id,
            title:req.title,
            description:req.description,
            reminder:req.reminder,
            color:req.color,
            isArchived:req.isArchived,
            isTrash:req.isTrash,
            isPinned:req.isPinned
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
                    message:"Note created successfully"
                }
                callback(null,data);
            }
        });
    }

}

module.exports = new noteModel();
