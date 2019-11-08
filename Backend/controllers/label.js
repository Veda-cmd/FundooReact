const labelService = require('../services/label');
const logger = require('../services/log');

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
            response.message= 'Operation failed';
            res.status(404).send(response);
        }
    }

    async updateLabel(req,res)
    {
        try
        {
            req.checkBody('label_id','Label ID cannot be empty').notEmpty();
            req.checkBody('label_name','Name cannot be empty').notEmpty();
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
            response.message= 'Operation failed';
            res.status(404).send(response);
        }   
    }

    async deleteLabel(req,res)
    {
        try 
        {
            req.checkBody('_id','Label id cannot be empty').notEmpty();
            const errors = await req.validationErrors();
            if(errors)
            {
                return res.status(422).json({ errors: errors });
            }

            labelService.delete(req.body,(err,data)=>
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
        catch (error) 
        {
            let response = {};
            response.success = false;
            response.message= 'Operation failed';
            res.status(404).send(response);
        }
    }
}

module.exports = new labelController();