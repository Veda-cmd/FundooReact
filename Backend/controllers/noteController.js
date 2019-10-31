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
            console.log("err", err);
        }
    }

    getNotes(req,res)
    {   
        let obj;
        if('isTrash' in req.query)
        {
            obj = req.query;
        }
        else if('isArchived' in req.query)
        {
            obj = req.query;
        }
        else
        {
            obj = req.query;
        }
        
        noteService.getNotes(obj,(err,data)=>
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

}

module.exports=new NoteController();


