
const labelModel = require('../models/label');
const note = require('./note');
const logger = require('./log');
const noteModel = require('../models/note');

class labelService
{
    add(req,callback)
    {  
        labelModel.findOne(req)
        .then(data=>
        {   
            if(data != null)
            {
                callback(null,data);
            }
            else
            {   
                labelModel.addLabel(req,(err,data)=>
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
        })
        .catch(err=>
        {
            callback(err);
        })
    }

    update(req,callback)
    {
        labelModel.update({_id:req.label_id},{label_name:req.label_name},(err,data)=>
        {
            if(err)
            {
                callback(err);
            }
            else
            {
                callback(null,data)
            }
        });
    }

    search(req,res)
    {
        return new Promise((resolve,reject)=>
        {
            noteModel.findAndPopulate(req,res,(err,data)=>
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve(data);
                }
            }) 
        });
    }

    delete(req,callback)
    {
        labelModel.delete(req,(err,data)=>
        {
            if(err)
            {
                callback(err);
            }
            else
            {
                let request = {
                    $pull:{
                        label:data._id
                    }
                }
                note.updateLabel(request,(error,success)=>
                {
                    if(error)
                    {
                        callback(error);
                    }
                    else
                    {
                        callback(null,success);
                    }
                })
            }
        });
    }
}

module.exports = new labelService();