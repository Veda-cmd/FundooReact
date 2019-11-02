const noteService = require('../services/noteService');
const authentication = require('../auth/auth');
const mail = require('../services/mailService');
const logger = require('../services/logService');

class NoteController
{ 
   
    async addNote(req,res)
    {
        try
        {
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

    getNotes(req,res)
    {   
        try 
        {
            if('isTrash' in req.query || 'isArchived' in req.query || 'reminder' in req.query)
            {
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

    searchNotes(req,res)
    {
        try 
        {
            if('title' in req.body || 'description' in req.body || 'reminder' in req.body || 'color' in req.body)
            {
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


