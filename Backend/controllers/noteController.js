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
                title:req.body.title,
                description:req.body.description,
                reminder:req.body.reminder,
                color:req.body.color,
                label:req.body.label,
                isTrash:req.body.isTrash,
                isArchived:req.body.isArchived,
                isPinned:req.body.isPinned,
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
            
            if('isTrash' in req.query || 'isArchived' in req.query || 'isPinned' in req.query || 'reminder' in req.query && 'email' in req.decoded)
            {
                let request = Object.keys(req.query)[0] === 'isTrash'? {user_id:req.decoded.email,isTrash:true}:
                Object.keys(req.query)[0] === 'isArchived'? {user_id:req.decoded.email,isArchived:true}:
                Object.keys(req.query)[0] === 'isPinned'? {user_id:req.decoded.email,isPinned:true}:
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

            if('search' in req.body && 'email' in req.decoded)
            {
                req.check('search','Search content cannot be empty').notEmpty();
                const errors = req.validationErrors();
                if(errors)
                {
                    return res.status(422).json({ errors: errors });
                }
                let request = {
                    email:req.decoded.email,
                    search:req.body.search
                }
        
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

    deleteLabelFromNote(req,res)
    {
        try 
        {
            req.checkBody('note_id','Note id cannot be empty').notEmpty();
            req.checkBody('label_id','Label id cannot be empty').notEmpty();
            noteService.deleteLabelFromNote(req.body)
            .then(data=>
            {
                res.status(200).send(data);
            })
            .catch(err=>
            {
                logger.error(err);
            });
        } 
        catch(error) 
        {
            logger.error("Operation unsuccessful");
        }
    }

    updateNote(req,res)
    {
        try 
        {
            req.checkBody('note_id','Note id cannot be empty').notEmpty();
            if('title' in req.body || 'description' in req.body || 'color' in req.body || 
            'reminder' in req.body || 'isArchived' in req.body || 'isPinned' in req.body
            && 'email' in req.decoded)
            {      
               noteService.updateNote(req.body)
               .then(data=>
                {
                    res.status(200).send(data);
                })
                .catch(err=>
                {
                    res.status(422).send(err);
                })
            }    
        } 
        catch(error) 
        {
            logger.error("Operation failed");
        }
    }

    deleteNote(req,res)
    {
        req.checkBody('note_id','Note id cannot be empty').notEmpty();
        noteService.deleteNote(req.body,(err,data)=>
        {
            if(err)
            {
                res.status(422).send(err);
            }
            else
            {
                res.status(200).send(data);
            }
        })
    }
}

module.exports=new NoteController();