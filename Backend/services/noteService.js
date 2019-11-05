/**
* @description: 
* @file: noteService.js
* @author: Vedant Nare
* @version: 1.0
*/

/**
*@description Dependencies are installed for execution. 
*/

const noteModel = require('../models/noteModel');
const labelService = require('./labelService');
const logger = require('../services/logService');

class noteService
{
    /**
    *@description Add service issues a callback to the calling function. 
    */

    add(req,callback)
    {
        noteModel.findOne({note_id:req.note_id})
        .then(data=>
        {
            /**
            *@description If data is found, error response is sent. Else add method in model
            *is called.
            */

            if(data != null)
            {
                callback({message:'Note already present with same note id'});
            }
            else
            {
                noteModel.add(req,(error,res)=>
                {
                    if(error)
                    {
                        callback(error);
                    }
                    else
                    {
                        for(let i=0;i<req.label.length;i++)
                        {   
                            
                            labelService.add({label_name:req.label[i]},(err,result)=>
                            {
                                if(result.id!=null)
                                {
                                   let labelID = [];
                                   labelID.push(result.id);
                                   let label = {
                                       $addToSet:{
                                           label:labelID
                                       }
                                   }
                                   noteModel.update({note_id:req.note_id},label,(error,success)=>
                                   {
                                        if(error)
                                        {
                                            callback(error);
                                        }
                                        else
                                        {
                                            callback(null,success);
                                        }
                                   });
                                }
                                else if(err)
                                {
                                    callback(err);
                                }
                                else
                                {
                                    callback({message:"id not found"});
                                }
                            });
                        }
                    }
                });
            }
        })
        .catch(err=>
        {
            logger.error('Err',err);
            callback(err);
        });
    }

    /**
    *@description getNotes service issues a callback to the calling function. 
    */

    getNotes(req,callback)
    {
        noteModel.findAll(req,(err,res)=>
        {
            if(err)
                callback(err)
            else
                callback(null,res)
        });
    }

    /**
    *@description search service issues a callback to the calling function. 
    */

    search(req,callback)
    {
        noteModel.findAll(req,(err,res)=>
        {
            if(err)
            {
                callback(err);
            }
            else
            {
                callback(null,res);
            }
        });
    }
}

module.exports = new noteService();