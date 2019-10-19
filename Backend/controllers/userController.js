/**
* @description: 
* @file: userController.js
* @author: Vedant Nare
* @version: 1.0
*/ 

/**
*@description Dependencies are installed for execution. 
*/ 

const userService = require('../services/userService');
const userModel = require('../models/userModel');
const urlService = require('../services/urlService');
const authentication = require('../auth/auth');
const mail = require('../services/mailService');

class Usercontroller
{

    /**
    *@description Register function is used for user registration. 
    */

    async register(req,res)
    {
        try 
        {
            /**
            * @description express-validator is used for validation of input. 
            */

            req.check('firstName','Length of name should be min 3 characters').isLength({min: 3});
            req.check('lastName','Last Name cannot be empty').notEmpty();
            req.check('email','Invalid email').isEmail();
            req.check('password','Invalid password').notEmpty().isLength({ min: 6 });
            const errors = await req.validationErrors();
            if(errors)
                return res.status(422).json({ errors: errors });
            userService.register(req.body)
            .then(data=>
            {   
                let request =
                {
                    email:data.email,
                    url:'http://localhost:8080/'
                }
                urlService.shortenUrl(request,(err,result)=>
                {
                    
                    if(err)
                        res.status(422).send(err)
                    else
                    { 
                        /**
                        * @description Verification email is sent using short url. 
                        */
                        mail.sendVerifyLink(result.shortUrl,result.email);
                        res.status(200).send(result)
                    }        
                });
            })
            .catch(err=>
            {
                res.status(422).send(err);
            })    
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
    *@description Login function is used for user login. 
    */

    async login(req,res)
    {
        try 
        {   
            /**
            * @description express-validator is used for validation of input. 
            */

            req.checkBody('email','Invalid email').notEmpty().isEmail();
            req.checkBody('password','Invalid password').notEmpty().isLength({ min: 6 });
            const errors = await req.validationErrors();

            if(errors)
                return res.status(422).json({ errors: errors });
             
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
            res.status(404).send(response);
        }    
    }

    /**
    *@description Forgot Password api is used for resetting user password. 
    */

    async forgot(req,res)
    {
        try
        {
            /**
            * @description express-validator is used for validation of input. 
            */

            req.checkBody('email','Invalid email').isEmail();
            const errors = await req.validationErrors();

            if(errors)
                return res.status(422).json({ errors: errors });
            
            userService.forgot(req.body)
            .then(data=>
            {
                /**
                * @description Token is generated and stored in a variable.
                */

                let payload = {email:data.email};
                let token = authentication.generateToken(payload);
                // console.log(token);
                
                let object = {
                    email:data.email,
                    token: token
                }
                userModel.updateToken(object,(err,result)=>
                {
                    // console.log('Err',err,'Result',result)
                    if(err)
                        res.status(422).send(err);
                    else
                    {
                        let url = 'http://localhost:8080/#!/reset/'+token;
                        // console.log(url);
                        mail.sendForgotLink(url,data.email);
                        res.status(200).send(data);
                    }
                });               
            })
            .catch(err=>
            {
                res.status(422).send(err);
            })
        }
        catch(error) 
        {
            let response = {};
            response.success = false;
            response.data = error;
            res.status(404).send(response);
        }
    }

    /**
    *@description Reset Password api is used for storing new password. 
    */

    async reset(req,res)
    {
        try 
        {   
            /**
            * @description express-validator is used for validation of input. 
            */

            req.check('old_password','Invalid password').notEmpty().isLength({ min: 6 });
            req.check('new_password','Invalid password').notEmpty().isLength({ min: 6 });
            const errors = await req.validationErrors();

            if(errors)
                return res.status(422).json({ errors: errors });
            
            let request={
                token:req.headers.token,
                old_password:req.body.old_password,
                new_password:req.body.new_password
            }
            userService.reset(request)
            .then((data)=>
            {
                res.status(200).send(data);
            })
            .catch(err=>
            {
                console.log(err); 
                res.status(422).send(err);
            })    
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
    *@description Email verification api is used for validation of user email
    */

    async verifyMail(req,res)
    {
        try 
        {
            urlService.verifyUrl(req,(err,data)=>
            {
                if(err)
                    res.status(422).send(err);
                else
                    res.status(200).send(data);
            })
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

module.exports=new Usercontroller();