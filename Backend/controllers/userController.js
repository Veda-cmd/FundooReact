const userService = require('../services/userService');
const authentication = require('../auth/auth');

class Usercontroller
{

    // register(req,res)
    // {
    //     req.check('firstName','Length of name should be min 3 characters').isLength({min: 3});
    //     req.check('lastName','Length of name should be min 3 characters').isLength({min: 3});
    //     req.check('email','Invalid email').isEmail();
    //     req.check('password','Invalid password').notEmpty().isLength({ min: 6 });
    //     const errors = req.validationErrors();
    //     if(errors)
    //         return res.status(422).json({ errors: errors });
    // }

    async login(req,res)
    {
        try 
        {   
            req.checkBody('email','Invalid email').isEmail();
            req.checkBody('password','Invalid password').notEmpty().isLength({ min: 6 });
            const errors = await req.validationErrors();

            if(errors)
            {
                console.log('Errors');
                return res.status(422).json({ errors: errors });
            }
             
             userService.login(req.body,(err,data)=>
            {
                if(err)   
                    res.status(422).send(err); 
                else
                    res.status(200).send(data); 
            });
        } 
        catch(error) 
        {
            let response = {};
            response.success = false;
            response.data = error;
            res.status(401).send(error);
        }    
    }
}

module.exports=new Usercontroller();