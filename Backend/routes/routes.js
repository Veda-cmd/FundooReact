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
const labelController = require('../controllers/labelController');


/**
*@description The particular method is called depending on the route. 
*/

router.post('/register', userControl.register);
router.post('/login', userControl.login);
router.post('/forgot',userControl.forgot);
router.post('/reset',auth.checkToken,userControl.reset);
router.post('/upload',auth.loginToken,profileImage.single('image'),userControl.upload);
router.post('/:url',auth.verificationToken,userControl.verifyMail);
router.post('/note/addNote',auth.loginToken,noteController.addNote);
router.get('/note/getNote',auth.loginToken,noteController.getNotes);
router.post('/note/deleteLabel',noteController.deleteLabelFromNote);
router.post('/note/updateNote',noteController.updateNote);
router.post('/note/deleteNote',noteController.deleteNote);
router.post('/note/searchNote',auth.loginToken,noteController.searchNotes);
router.post('/label/add',labelController.addLabel);
router.post('/label/update',labelController.updateLabel);


module.exports = router;