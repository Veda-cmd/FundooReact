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
        noteModel.findOne({title:req.title})
        .then(data=>
        {
            /**
            *@description If data is found, error response is sent. Else add method in model
            *is called.
            */

            if(data != null)
            {
                callback({message:'Note already present with same title'});
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
                                   noteModel.update({title:req.title},label,(error,success)=>
                                   {
                                        if(error)
                                        {
                                            callback(error);
                                        }
                                        else
                                        {
                                            callback(null,{message:"Note created successfully"});
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
        let enteredData = req.search,
        noteArray,labelArray,
        query= {
            $and: [{
                $or: // the $or carries out the optional functionality
                    [   //options i Case insensitivity to match upper and lower cases. 
                        { 'title': { $regex: enteredData, $options: 'i' } },
                        { 'description': { $regex: enteredData, $options: 'i' } },
                        { 'reminder': { $regex: enteredData, $options: 'i' } },
                        { 'color': { $regex: enteredData, $options: 'i' } }
                    ]
            }, { 'user_id': req.email }]
        }

        noteModel.findAll(query,(err,res)=>
        {
            if(err)
            {
               logger.error(err);
            }
            else
            {
                if(res.length >=0)
                {
                    let label = {
                        user_id:req.email,
                    }
                    let labelSearch = {
                        search:  { $regex: enteredData, $options: 'i' } ,
                    }
                    labelService.search(label,labelSearch)
                    .then(data=>
                    {   
                        if(data.length > 0)
                        {
                            if(res.length === 0)
                            {
                                logger.error('Res length is 0');
                                return callback(null,{ success: true, message: "Data found in labels", data: data });
                            }
                              
                            for(let i=0;i<data.length;i++)
                            {
                                for(let j=0;j<res.length;j++)
                                {
                                    if(data[i]._id == res[j]._id)
                                    {
                                        res.splice(j,1);
                                    }
                                }
                                res.push(data[i]);
                            }
                            callback(null,{ success: true, message: "Data found in notes and labels", data: res });
                        }
                        else if(res.length>0)
                        {
                            callback(null,{ success: true, message: "Data found in notes", data: res });
                        }
                        else
                        {
                            callback({ success: false, message: "No data found"});
                        }  
                    })
                    .catch(error=>
                    {
                        logger.error({error:"Operation failed"});  
                    });
                }
            }
        });  
    }

    deleteLabelFromNote(req)
    {
        console.log(req);
        return new Promise((resolve,reject)=>
        {
            let label = {
                $pull:{
                    label:req.label_id
                }
            }

            noteModel.update({_id:req.note_id},label,(err,data)=>
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve({message:"Label deleted successfullyk"});
                }
            });
        });
    }

    updateNote(req)
    {
        return new Promise((resolve,reject)=>
        {
            noteModel.findOne({_id:req.note_id})
            .then(data=>
            {
                let note = {
                    "title": req.title ? req.title : data.title,
                    "description": req.description ? req.description : data.description,
                    "color": req.color ? req.color : data.color,
                    "isArchived": req.isArchived == true ? true : false,
                    "isPinned": req.isPinned == true ? true : false,
                    "reminder": req.reminder ? req.reminder: data.reminder
                }
        
                noteModel.update({_id:data._id},note,(error,res)=>
                {
                    if(error)
                    {
                        reject(error);
                    }
                    else
                    {
                        resolve({message:"Note updated successfully"});
                    }
                });

            })
            .catch(err=>
            {
                reject(err);
            });
        })
    }

    deleteNote(req,callback)
    {
        noteModel.update({_id:req.note_id},{isTrash:true},(err,data)=>
        {
            if(err)
            {
                callback(err);
            }
            else
            {
                callback(null,{message:'Note moved to Trash'});
            }
        });
    }
}

module.exports = new noteService();