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
const noteController = require('../controllers/noteController');
const auth = require('../auth/auth');
const { profileImage } = require('../services/s3Service');

/**
*@description The particular method is called depending on the route. 
*/

router.post('/register', userControl.register);
router.post('/login', userControl.login);
router.post('/forgot',userControl.forgot);
router.post('/reset',auth.checkToken,userControl.reset);
router.post('/:url',auth.checkToken,userControl.verifyMail);
router.post('/api/upload',auth.checkToken,profileImage.single('element1'),userControl.upload);
router.post('/note/addNote', noteController.addNote);
router.get('/note/getNote',noteController.getNotes);
router.post('/note/searchNote',noteController.searchNotes);


module.exports = router;