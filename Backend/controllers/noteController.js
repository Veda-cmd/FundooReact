/**
* @description: 
* @file: noteController.js
* @author: Vedant Nare
* @version: 1.0
*/ 

/**
*@description Dependencies are installed for execution. 
*/ 

const noteService = require('../services/noteService');
const authentication = require('../auth/auth');
const redis = require('../services/cacheService');
const mail = require('../services/mailService');
const logger = require('../services/logService');

class NoteController
{ 
    /**
    *@description addNote API is used for creation of new note.
    */

    async addNote(req,res)
    {
        try
        {
            /**
            * @description express-validator is used for validation of input. 
            */

            req.check('note_id','Note id should have a number').notEmpty();
            req.check('title','Title cannot be empty').notEmpty();
            req.check('description','Description cannot be empty').notEmpty();
            req.check('reminder','Reminder cannot be empty').notEmpty();
            req.check('color','Color cannot be empty').notEmpty();
            const errors = await req.validationErrors();
            if(errors)
            {
                return res.status(422).json({ errors: errors });
            }

            /**
            *@description note Service is called. If success, positive response is sent to client.
            */

            let request = {
                note_id:req.body.note_id,
                title:req.body.title,
                description:req.body.description,
                reminder:req.body.reminder,
                color:req.body.color,
                label:req.body.label,
                isTrash:req.body.isTrash,
                isArchived:req.body.isArchived,
                user_id: req.decoded.email,
            }
            noteService.add(request,(err,success)=>
            {
                if(err)
                {
                    res.status(422).send(err);
                }
                else
                {
                    res.status(200).send(success);
                }
            });
        }
        catch(err)
        {
            let response = {};
            response.success = false;
            response.data = error;
            res.status(404).send(response);
        }
    }

    /**
    *@description getNote API is used for retrieving notes through params.
    */

    getNotes(req,res)
    {   
        try 
        {
            /**
            *@description If params are not present in req.query, it goes to else part.
            */
            
            if('isTrash' in req.query || 'isArchived' in req.query || 'reminder' in req.query && 'email' in req.decoded)
            {
                let request = Object.keys(req.query)[0] === 'isTrash'? {user_id:req.decoded.email,isTrash:true}:
                Object.keys(req.query)[0] === 'isArchived'? {user_id:req.decoded.email,isArchived:true}:
                Object.keys(req.query)[0] === 'reminder'? {user_id:req.decoded.email,reminder:req.query.reminder}:
                new Error("Undefined request");

                /**
                *@description note Service is called. If success, positive response is sent to client.
                */
               
                // console.log(request);
                noteService.getNotes(request,(err,data)=>
                {
                    if(err)
                    {
                        res.status(422).send(err);
                    }
                    else
                    {    
                        res.status(200).send(data);
                    }
                });   
            }
            else
            {
                return res.status(422).send({message:"No params found in url"});
            }
        } 
        catch (error) 
        {
            let response = {};
            response.success = false;
            response.data = error;
            res.status(404).send(response);
        } 
        
    }

    /**
    *@description searchNotes API is used for searching notes.
    */

    searchNotes(req,res)
    {
        try 
        {
            /**
            *@description If params are not present in req.body, it goes to else part.
            */

            if('title' in req.body || 'description' in req.body || 'reminder' in req.body || 'color' in req.body && 'email' in req.decoded)
            {
                let request = Object.keys(req.body)[0] === 'title'? {user_id:req.decoded.email,title:req.body.title}:
                    Object.keys(req.body)[0] === 'description'? {user_id:req.decoded.email,description:req.body.description}:
                    Object.keys(req.body)[0] === 'color'? {user_id:req.decoded.email,description:req.body.color}:
                    Object.keys(req.body)[0] === 'reminder'? {user_id:req.decoded.email,reminder:req.body.reminder}:
                    new Error("Undefined request");

                /**
                *@description note Service is called. If success, positive response is sent to client.
                */
               
                noteService.search(request,(err,result)=>
                {
                    if(err)
                    {
                        res.status(422).send(err);
                    }
                    else
                    {
                        res.status(200).send(result);
                    }
                });
            }
            else
            {
                return res.status(422).send({message:"No params found in body of request"});
            }
        } 
        catch (error) 
        {
            let response = {};
            response.success = false;
            response.data = error;
            res.status(404).send(response);
        }

    }

}

module.exports=new NoteController();