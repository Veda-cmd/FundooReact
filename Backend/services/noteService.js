const noteModel = require('../models/noteModel');
const logger = require('../services/logService');

class noteService
{
    add(req,callback)
    {
        noteModel.findOne({note_id:req.note_id})
        .then(data=>
        {
            if(data)
            {
                callback('Note already present with same id');
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