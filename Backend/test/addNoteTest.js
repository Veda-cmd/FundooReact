/**
* @description: 
* @file: addNoteTest.js
* @author: Vedant Nare
* @version: 1.0
*/

/**
*@description Dependencies are installed for execution. 
*/

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let data = require('./test.json');

chai.use(chaiHttp);

describe("Creation of Notes --> Positive Test",()=>
{
    it("Note created successfully",(done)=>
    {
        chai.request(server)
        .post('/note/addNote')
        .send(data.noteSuccess)
        .end((err, res) => {
            if(err)
            {
                res.should.have.status(422);
                res.should.be.a('object');
            }
            else
            {
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('message');
            }
            
        done();
        });
    });
});

describe("Creation of Notes --> Negative Test",()=>
{
    it("Note creation error due to missing fields",(done)=>
    {
        chai.request(server)
        .post('/note/addNote')
        .send(data.noteIncomplete)
        .end((err, res) => {
            res.should.have.status(422);
            res.should.be.a('object');
            res.body.errors[0].should.have.property('param');
            res.body.errors[0].should.have.property('msg');
        done();
        });
    });

    it("Note should contain title and description",(done)=>
    {
        chai.request(server)
        .post('/note/addNote')
        .send(data.noteTitle)
        .end((err, res) => {
            res.should.have.status(422);
            res.should.be.a('object');
            res.body.errors[0].should.have.property('param');
            res.body.errors[0].should.have.property('msg');
        done();
        });
    });

    it("Note ID should be unique",(done)=>
    {
        chai.request(server)
        .post('/note/addNote')
        .send(data.notePresent)
        .end((err, res) => {
            res.should.have.status(422);
            res.should.be.a('object');
            res.body.should.have.property('message');
        done();
        });
    });

    it("Note ID should be an number",(done)=>
    {
        chai.request(server)
        .post('/note/addNote')
        .send(data.noteId)
        .end((err, res) => {
            res.should.have.status(422);
            res.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('name','CastError');
        done();
        });
    });
});