const labelService = require('../services/labelService');
const logger = require('../services/logService');

class labelController
{
    async addLabel(req,res)
    {
        try 
        {
            req.checkBody('label_name','Name cannot be empty').notEmpty();
            const errors = await req.validationErrors();
            if(errors)
            {
                return res.status(422).json({ errors: errors });
            }
            labelService.add(req.body,(err,data)=>
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
        catch(error) 
        {
            let response = {};
            response.success = false;
            response.data = error;
            res.status(404).send(response);
        }
    }

    async updateLabel(req,res)
    {
        try
        {
            req.checkBody('old_label_name','Name cannot be empty').notEmpty();
            req.checkBody('new_label_name','Name cannot be empty').notEmpty();
            const errors = await req.validationErrors();
            if(errors)
            {
                return res.status(422).json({ errors: errors });
            }
    
            labelService.update(req.body,(err,data)=>
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
        catch(error) 
        {
            let response = {};
            response.success = false;
            response.data = error;
            res.status(404).send(response);
        }   
    }
}

module.exports = new labelController();