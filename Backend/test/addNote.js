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
        .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYmQ2OGFjZjMwODE2MGYyNDM0MTNiYSIsImVtYWlsIjoidmVkYW50Lm5hcmUwNEBnbWFpbC5jb20iLCJpYXQiOjE1NzI5MzQ1ODYsImV4cCI6MTU3Mjk3Nzc4Nn0.9g22js28RKuvF80rN1SnXyjthA_7tHUYZbqXfKwrGAI")
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
        .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYmQ2OGFjZjMwODE2MGYyNDM0MTNiYSIsImVtYWlsIjoidmVkYW50Lm5hcmUwNEBnbWFpbC5jb20iLCJpYXQiOjE1NzI5MzQ1ODYsImV4cCI6MTU3Mjk3Nzc4Nn0.9g22js28RKuvF80rN1SnXyjthA_7tHUYZbqXfKwrGAI")
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
        .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYmQ2OGFjZjMwODE2MGYyNDM0MTNiYSIsImVtYWlsIjoidmVkYW50Lm5hcmUwNEBnbWFpbC5jb20iLCJpYXQiOjE1NzI5MzQ1ODYsImV4cCI6MTU3Mjk3Nzc4Nn0.9g22js28RKuvF80rN1SnXyjthA_7tHUYZbqXfKwrGAI")
        .send(data.noteTitle)
        .end((err, res) => {
            res.should.have.status(422);
            res.should.be.a('object');
            res.body.errors[0].should.have.property('param');
            res.body.errors[0].should.have.property('msg');
        done();
        });
    });

});