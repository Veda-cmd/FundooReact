/**
* @description: 
* @file: forgotTest.js
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

describe('Forgot User',()=>
{
    it('Password Reset link has been sent to registered email',(done)=>
    {
        let person = data.forgotSuccess;
        chai.request(server)
        .post('/forgot')
        .send(person)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a('object');
            res.body.should.have.property('email');
            res.body.should.have.property('message');
        done();
        })
    });

    it('Forgot pass error due to missing fields',(done)=>
    {
        let person = data.forgotIncomplete;
        chai.request(server)
        .post('/forgot')
        .send(person)
        .end((err, res) => {
            res.should.have.status(422);
            res.should.be.a('object');
            res.body.errors[0].should.have.property('param');
            res.body.errors[0].should.have.property('msg');
        done();
        })
    });

    it('Email should be valid',(done)=>
    {
        let person = data.forgotEmail;
        chai.request(server)
        .post('/forgot')
        .send(person)
        .end((err, res) => {
            res.should.have.status(422);
            res.should.be.a('object');
            res.body.errors[0].should.have.property('param');
            res.body.errors[0].should.have.property('msg');
        done();
        })
    });
})