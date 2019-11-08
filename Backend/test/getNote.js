/**
* @description: 
* @file: getNoteTest.js
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

chai.use(chaiHttp);

describe("Get Notes using reminders,Archive and Trash --> Positive Test",()=>
{
    it('Get Note using reminder successful',(done)=>
    {
        chai.request(server)
        .get('/note/getNote?reminder=01-11-2019')
        .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYmQ2OGFjZjMwODE2MGYyNDM0MTNiYSIsImVtYWlsIjoidmVkYW50Lm5hcmUwNEBnbWFpbC5jb20iLCJpYXQiOjE1NzI5MzQ1ODYsImV4cCI6MTU3Mjk3Nzc4Nn0.9g22js28RKuvF80rN1SnXyjthA_7tHUYZbqXfKwrGAI")
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].should.have.property('title');
            res.body[0].should.have.property('reminder');
        done();
        });
    });

    it('Get Note using isArchived successful',(done)=>
    {
        chai.request(server)
        .get('/note/getNote?isArchived=true')
        .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYmQ2OGFjZjMwODE2MGYyNDM0MTNiYSIsImVtYWlsIjoidmVkYW50Lm5hcmUwNEBnbWFpbC5jb20iLCJpYXQiOjE1NzI5MzQ1ODYsImV4cCI6MTU3Mjk3Nzc4Nn0.9g22js28RKuvF80rN1SnXyjthA_7tHUYZbqXfKwrGAI")
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].should.have.property('title');
            res.body[0].should.have.property('isArchived');
        done();
        });
    });

    it('Get Note using isTrash successful',(done)=>
    {
        chai.request(server)
        .get('/note/getNote?isTrash=true')
        .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYmQ2OGFjZjMwODE2MGYyNDM0MTNiYSIsImVtYWlsIjoidmVkYW50Lm5hcmUwNEBnbWFpbC5jb20iLCJpYXQiOjE1NzI5MzQ1ODYsImV4cCI6MTU3Mjk3Nzc4Nn0.9g22js28RKuvF80rN1SnXyjthA_7tHUYZbqXfKwrGAI")
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].should.have.property('title');
            res.body[0].should.have.property('isTrash');
        done();
        });
    });
});

describe("Get Notes using reminders,Archive and Trash --> Negative Test",()=>
{
    it('Parameter value cannot be empty',(done)=>
    {
        chai.request(server)
        .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYmQ2OGFjZjMwODE2MGYyNDM0MTNiYSIsImVtYWlsIjoidmVkYW50Lm5hcmUwNEBnbWFpbC5jb20iLCJpYXQiOjE1NzI5MzQ1ODYsImV4cCI6MTU3Mjk3Nzc4Nn0.9g22js28RKuvF80rN1SnXyjthA_7tHUYZbqXfKwrGAI")
        .get('/note/getNote?reminder')
        .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
        done();
        });
    });

    it('Get Note Url should contain params',(done)=>
    {
        chai.request(server)
        .get('/note/getNote')
        .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYmQ2OGFjZjMwODE2MGYyNDM0MTNiYSIsImVtYWlsIjoidmVkYW50Lm5hcmUwNEBnbWFpbC5jb20iLCJpYXQiOjE1NzI5MzQ1ODYsImV4cCI6MTU3Mjk3Nzc4Nn0.9g22js28RKuvF80rN1SnXyjthA_7tHUYZbqXfKwrGAI")
        .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
        done();
        });
    });
});