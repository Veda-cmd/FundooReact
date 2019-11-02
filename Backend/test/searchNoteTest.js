/**
* @description: 
* @file: searchNoteTest.js
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

describe("Searching Notes --> Positive Test",()=>
{
    it("Note Search successful",(done)=>
    {
        chai.request(server)
        .post('/note/searchNote')
        .send(data.searchNoteSuccess)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].should.have.property('title');
            res.body[0].should.have.property('reminder');
        done();
        });
    });
});

describe("Searching Notes --> Negative Test",()=>
{
    it("Title/Description/Color/Reminder value should not be empty",(done)=>
    {
        chai.request(server)
        .post('/note/searchNote')
        .send(data.searchNoteEmpty)
        .end((err, res) => 
        {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
        done();
        });
    });
});