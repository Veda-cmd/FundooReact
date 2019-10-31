const mongoose = require('mongoose');
const logger = require('../services/logService');

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
        type:Date,
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

const Note = mongoose.model('note',noteSchema);

class noteModel
{
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
                callback(err);
            else
            {
                callback(null,data);
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
                callback(null,data);
            }
        });
    }
}

module.exports = new noteModel();
