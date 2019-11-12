/**
* @description: 
* @file: label.js
* @author: Vedant Nare
* @version: 1.0
*/

/**
*@description Dependencies are installed for execution. 
*/

const labelService = require('../services/label');
const service = require('../services/note');
const logger = require('../services/log');

class labelController {

    /**
    *@description addLabel API is used for creation of new label.
    */

    async addLabel(req, res) {
        try {

            // express-validator is used for validation of input
            req.checkBody('label_name', 'Name cannot be empty').notEmpty();
            const errors = await req.validationErrors();
            if (errors) {
                return res.status(422).json({ errors: errors });
            }

            // add method of label service is called
            labelService.add(req.body, (err, data) => {
                if (err) {
                    res.status(422).send(err);
                }
                else {
                    res.status(200).send(data);
                }
            });
        }
        catch (error) {
            let response = {};
            response.success = false;
            response.message = 'Operation failed';
            res.status(404).send(response);
        }
    }

    /**
    *@description updateLabel API is used for updating one/many fields in a label.
    */

    async updateLabel(req, res) {
        try {
             // express-validator is used for validation of input
            req.checkBody('label_id', 'Label ID cannot be empty').notEmpty();
            req.checkBody('label_name', 'Name cannot be empty').notEmpty();
            const errors = await req.validationErrors();
            if (errors) {
                return res.status(422).json({ errors: errors });
            }

            // update method of label service is called
            labelService.update(req.body, (err, data) => {
                if (err) {
                    res.status(422).send(err);
                }
                else {
                    res.status(200).send(data);
                }
            });
        }
        catch (error) {
            let response = {};
            response.success = false;
            response.message = 'Operation failed';
            res.status(404).send(response);
        }
    }

    /**
    *@description deleteLabel API is used for deleting labels.
    */

    async deleteLabel(req, res) {
        try {
            req.checkBody('_id', 'Label id cannot be empty').notEmpty();
            const errors = await req.validationErrors();
            if (errors) {
                return res.status(422).json({ errors: errors });
            }

            // delete method of label service is called
            labelService.delete(req.body, (err, data) => {
                if (err) {
                    res.status(422).send(err);
                }
                else {
                    // after getting success response from label service, we call removeLabel method
                    // in note Service to update notes having reference of the deleted label.
                    let request = {
                        $pull: {
                            label: data._id
                        }
                    }
                
                    service.removeLabel(request, (error, success) => {
                        if (error) {
                            res.status(422).send(err);
                        }
                        else {
                            res.status(200).send(data);
                        }
                    })

                }
            });
        }
        catch (error) {
            let response = {};
            response.success = false;
            response.message = 'Operation failed';
            res.status(404).send(response);
        }
    }
}

module.exports = new labelController();