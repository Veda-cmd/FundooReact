/**
* @description: 
* @file: noteService.js
* @author: Vedant Nare
* @version: 1.0
*/

/**
*@description Dependencies are installed for execution. 
*/

const redis = require('./cache');
const cron = require('node-cron')
const noteModel = require('../models/note');
const labelService = require('./label');
const logger = require('./log');


class noteService {

    /**
    *@description Add service issues a callback to the calling function. 
    */

    add(req, callback) {
        noteModel.findOne({ title: req.title })
            .then(data => {
                /**
                    *@description If data is found, error response is sent. Else add method in model
                *is called.
                */

                if (data != null) {
                    callback({ message: 'Note already present with same title' });
                }
                else {
                    // add method is used for saving note to database

                    noteModel.add(req, (error, res) => {
                        if (error) {
                            callback(error);
                        }
                        else {
                            let count = 0;
                            if (req.label == undefined) {
                                return callback(null, res);
                            }

                            for (let i = 0; i < req.label.length; i++) {
                                // If label field is present in request, labelService is called to 
                                // register the label in Schema and return label id.

                                labelService.add({ label_name: req.label[i] }, (err, result) => {

                                    if (result.id != null) {
                                        let labelID = [];
                                        labelID.push(result.id);

                                        // $addToSet operator adds a value to an array unless the value
                                        // is already present,$addToSet does nothing to that array.

                                        let label = {
                                            $addToSet: {
                                                label: labelID
                                            }
                                        }

                                        // Label field of note is updated with returned label id.

                                        noteModel.updateOne({ title: req.title }, label, (error, success) => {
                                            if (error) {
                                                callback(error);
                                            }
                                            else {
                                                logger.info('Label updated');
                                                count++;
                                                if (count == req.label.length) {
                                                    callback(null, success);
                                                    this.getAllNotes({ email: req.user_id });
                                                }
                                            }
                                        });
                                    }
                                    else if (err) {
                                        console.log('in else if', err);
                                        callback(err);
                                    }
                                    else {
                                        callback({ message: "id not found" });
                                    }
                                });
                            }
                        }
                    });
                }
            })
            .catch(err => {
                logger.error('Err', err);
                callback(err);
            });
    }

    /**
    *@description getNotes service returns a promise to the calling function.  
    */

    getListings(req) {
        return new Promise((resolve, reject) => {
            noteModel.findAll(req, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    let key = Object.keys(req)[1] + req.user_id;
                    redis.set(key, JSON.stringify(res), (error, data) => {
                        if (error) {
                            logger.error(error);
                        }
                        else {
                            logger.info(`Success in setting ${Object.keys(req)[1]} key`);
                        }
                    });
                    resolve(res);
                }
            });
        })
    }

    /**
    *@description getNotes service returns a promise to the calling function. 
    */

    getAllNotes(req) {
        return new Promise((resolve, reject) => {
            noteModel.findAllAndPopulate({ user_id: req.email }, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    let key = 'getAllNotes' + req.email;
                    redis.set(key, JSON.stringify(data), (error, result) => {
                        if (error) {
                            logger.error(error);
                        }
                        else {
                            logger.info("Success in setting getAllNotes");
                        }
                    });
                    resolve(data);
                }
            });
        });
    }

    /**
    *@description search service issues a callback to the calling function. 
    */

    search(req, callback) {
        // $and performs a logical AND operation on an array of one or more expressions.
        // $or performs a logical OR operation on an array of two or more expressions.
        // $regex is used to search for specific strings in the collection.

        let enteredData = req.search,
            query = {
                $and: [{
                    $or:
                        [
                            { 'title': { $regex: enteredData, $options: 'i' } },
                            { 'description': { $regex: enteredData, $options: 'i' } },
                            { 'reminder': { $regex: enteredData, $options: 'i' } },
                            { 'color': { $regex: enteredData, $options: 'i' } }
                        ]
                }, { 'user_id': req.email }]
            }

        // Notes are retrieved according to the specified query.

        noteModel.findAll(query, (err, res) => {
            if (err) {
                logger.error(err);
            }
            else {
                if (res.length >= 0) {
                    let label = {
                        user_id: req.email,
                    }
                    let labelSearch = {
                        search: { $regex: enteredData, $options: 'i' },
                    }

                    // labelService is called for searching given value in labels.

                    labelService.search(label, labelSearch)
                        .then(data => {
                            // if data array has length greater than 0, if loop is executed.

                            if (data.length > 0) {
                                for (let i = 0; i < data.length; i++) {
                                    for (let j = 0; j < res.length; j++) {
                                        // if an item in data array matches with an item in res array,
                                        // splice method is used to remove item from res array to avoid
                                        // duplication.

                                        if (data[i]._id == res[j]._id) {
                                            res.splice(j, 1);
                                        }
                                    }
                                    // the item in data array is pushed to res array.

                                    res.push(data[i]);
                                }
                                callback(null, { success: true, message: "Data found in notes and labels", data: res });
                            }

                            // if no data found in labels, then else if is executed if res length is
                            // greater than 0.

                            else if (res.length > 0) {
                                callback(null, { success: true, message: "Data found in notes", data: res });
                            }
                            // else loops triggers when no data is found.

                            else {
                                callback({ success: false, message: "No data found" });
                            }
                        })
                        .catch(error => {
                            logger.error({ error: "Operation failed" });
                        });
                }
            }
        });
    }

    /**
    *@description updateNote service returns a promise to the calling function. 
    */

    updateNote(req) {
        try {
            return new Promise((resolve, reject) => {
                // Note is searched in database and using note_id.

                console.log('in note-->', req);

                noteModel.findOne({ _id: req.note_id })
                    .then(data => {
                        let note = {
                            "title": req.title ? req.title : data.title,
                            "description": req.description ? req.description : data.description,
                            "color": req.color ? req.color : data.color,
                            "isArchived": req.isArchived == true ? true : false,
                            "isPinned": req.isPinned == true ? true : false,
                            "reminder": req.reminder ? req.reminder : data.reminder
                        }

                        // the new fields are updated according to given data in request.

                        noteModel.updateOne({ _id: data._id }, note, (error, res) => {
                            if (error) {
                                reject(error);
                            }
                            else {
                                resolve({ message: "Note updated successfully" });
                                let archiveObject = { user_id: res.user_id, isArchived: true };
                                this.getListings(archiveObject);
                                let trashObject = { user_id: res.user_id, isTrash: true };
                                this.getListings(trashObject);
                                let pinnedObject = { user_id: res.user_id, isPinned: true };
                                this.getListings(pinnedObject);
                            }
                        });

                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        }
        catch (error) {

        }
    }

    /**
    *@description deleteNote service issues a callback to the calling function.
    */

    deleteNote(req, callback) {
        // isTrash property of the specified note is updated to true.

        noteModel.updateOne({ _id: req.note_id }, { isTrash: true }, (err, data) => {
            if (err) {
                callback(err);
            }
            else {
                callback(null, { message: 'Note moved to Trash' });
            }
        });
    }

    /**
    *@description addLabelToNote service returns a promise to the calling function.
    */

    addLabelToNote(req) {
        return new Promise((resolve, reject) => {
            // note is retrieved through the given note id.
            noteModel.findOne({ _id: req.note_id })
                .then(data => {
                    labelService.add(req, (error, success) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            let result = {
                                $addToSet: {
                                    label: success.id
                                }
                            }

                            // Given label is added to the note using updateOne.
                            noteModel.updateOne({ _id: data._id }, result, (errors, response) => {
                                if (errors) {
                                    reject(errors);
                                }
                                else {
                                    resolve({ message: "Label added successfully" });
                                }
                            });
                        }
                    });
                })
                .catch(err => {
                    reject({ message: "Error in finding note.Please check note id." });
                })
        });


    }

    /**
    *@description deleteLabelFromNote service returns a promise to the calling function.
    */

    deleteLabelFromNote(req) {
        return new Promise((resolve, reject) => {
            // $pull removes from an existing array all instances of a value or values 
            // that match a specified condition.

            let label = {
                $pull: {
                    label: req.label_id
                }
            }

            // Given label is removed from the note using update.

            noteModel.updateOne({ _id: req.note_id }, label, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve({ message: "Label deleted successfullyk" });
                }
            });
        });
    }

    /**
    *@description removeLabel service issues a callback to the calling function.
    */

    removeLabel(req, callback) {
        // updateMany method from note model is called
        noteModel.updateMany({}, req, (err, data) => {
            if (err) {
                return callback(err);
            }
            else {
                return callback(null, data);
            }
        });
    }

    /**
    *@description oldNotes and reminderSchedular are jobs running on cron scheduler.
    */

    oldNotes() {
        cron.schedule('* 1 * * *', () => {
            let time = new Date();
            noteModel.findAll({ isArchived: false }, (err, data) => {
                if (err) {
                    logger.error(err);
                }
                else {
                    data.forEach(element => {
                        let updatedDate = new Date(element.updated_at),
                            currDate = new Date(),
                            Difference_In_Time = currDate.getTime() - updatedDate.getTime(),
                            Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                        Difference_In_Days > 30 ? this.updateNote({ note_id: element._id, isArchived: true }) : new Error("Something went wrong..!")
                    });
                }
            });
            logger.info(`Old Note Schedular running.Time:${time.getHours()}:${time.getMinutes()}`);
        });
    }

    reminderSchedular() {
        cron.schedule('* 15 * * * *', () => {
            noteModel.findAll({}, (err, result) => {
                if (err) {
                    callback(err);
                }
                else {
                    let call = this, array = [];
                    function runOldReminder(data) {
                        let res = data.filter(item => {
                            return item.reminder != 'false';

                        });
                        res.forEach(element => {
                            if (new Date(element.reminder) < new Date()) {
                                let note = { note_id: element._id, reminder: "false" };
                                call.updateNote(note, (error, success) => {
                                    if (error) {
                                        logger.error(error);
                                    }
                                });
                            }
                            else {
                                array.push(element);
                            }
                        });
                        sortNotesUsingReminder(array);
                    }
                    runOldReminder(result);
                    function sortNotesUsingReminder(sortArray) {

                        for (let k = 0; k < sortArray.length; k++) {
                            for (let i = k + 1; i < sortArray.length; i++) {
                                let reminderDateOne = new Date(sortArray[k].reminder),
                                    reminderDateTwo = new Date(sortArray[i].reminder),
                                    currentDate = new Date();
                                if ((reminderDateOne.getTime() - currentDate.getTime()) > (reminderDateTwo.getTime() - currentDate.getTime())) {
                                    let temporary = sortArray[k];
                                    sortArray[k] = sortArray[i];
                                    sortArray[i] = temporary;
                                }
                            }
                        }

                        for (let j = 0; j < sortArray.length; j++) {
                            let currentReminder = new Date(sortArray[j].reminder).getDay();
                            let today = new Date().getDay();
                            if (sortArray[j].reminder != 'false' && currentReminder == today) {
                                console.log(`Upcoming reminders are:\n`, sortArray[j]);
                            }
                        }
                    }
                }
                logger.info(`Reminder Schedular Running`)
            });
        })
    }
}

let note = new noteService();
note.oldNotes();
note.reminderSchedular();
module.exports = new noteService();


