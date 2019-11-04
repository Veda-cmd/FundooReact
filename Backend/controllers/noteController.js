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

            noteService.add(req.body,(err,success)=>
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
            
            if('isTrash' in req.query || 'isArchived' in req.query || 'reminder' in req.query)
            {
                /**
                *@description note Service is called. If success, positive response is sent to client.
                */

                noteService.getNotes(req.query,(err,data)=>
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

            if('title' in req.body || 'description' in req.body || 'reminder' in req.body || 'color' in req.body)
            {
                /**
                *@description note Service is called. If success, positive response is sent to client.
                */
               
                noteService.search(req.body,(err,result)=>
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


