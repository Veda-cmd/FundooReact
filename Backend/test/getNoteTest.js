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
        .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
        done();
        });
    });
});