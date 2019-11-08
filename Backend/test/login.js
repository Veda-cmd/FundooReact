/**
* @description: 
* @file: loginTest.js
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

describe('Login User',()=>
{
    it('User Login is successful',(done)=>
    {
        let person = data.loginSuccess;
        chai.request(server)
        .post('/login')
        .send(person)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a('object');
            res.body.should.have.property('response');
            res.body.should.have.property('session');
        done();
        })
    });

    it('Login error due to missing fields',(done)=>
    {
        let person = data.loginIncomplete;
        chai.request(server)
        .post('/login')
        .send(person)
        .end((err, res) => {
            res.should.have.status(422);
            res.should.be.a('object');
            res.body.errors[0].should.have.property('param');
            res.body.errors[0].should.have.property('msg');
        done();
        })
    });

    it('User Login failed',(done)=>
    {
        let person = data.loginFail;
        chai.request(server)
        .post('/login')
        .send(person)
        .end((err, res) => {
            res.should.have.status(422);
            res.should.be.a('object');
            res.body.should.have.property('message');
        done();
        })
    });

    it('User Email is invalid',(done)=>
    {
        let person = data.loginEmail;
        chai.request(server)
        .post('/login')
        .send(person)
        .end((err, res) => {
            res.should.have.status(422);
            res.should.be.a('object');
            res.body.errors[0].should.have.property('param');
            res.body.errors[0].should.have.property('msg');
        done();
        })
    });

    it('User password is invalid',(done)=>
    {
        let person = data.loginPassword;
        chai.request(server)
        .post('/login')
        .send(person)
        .end((err, res) => {
            res.should.have.status(422);
            res.should.be.a('object');
            res.body.errors[0].should.have.property('param');
            res.body.errors[0].should.have.property('msg');
        done();
        })
    });

    it('Login failed since user is not verified',(done)=>
    {
        let person = data.loginVerify;
        chai.request(server)
        .post('/login')
        .send(person)
        .end((err, res) => {
            res.should.have.status(422);
            res.should.be.a('object');
            res.body.should.have.property('message');
        done();
        })
    });
})