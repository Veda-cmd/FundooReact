/**
* @description: 
* @file: routes.js
* @author: Vedant Nare
* @version: 1.0
*/ 

/**
*@description Dependencies are installed for execution. 
*/ 

const express = require('express');
const router = express.Router();
const userControl = require('../controllers/userController');
const auth = require('../auth/auth');

/**
*@description The particular method is called depending on the route. 
*/

// router.post('/register', userControl.register);
router.post('/login', userControl.login);
// router.post('/forgot',userControl.forgot);
// router.post('/reset',auth.checkToken,userControl.reset);

module.exports = router;