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

            if(data)
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
                        callback(null,res);
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