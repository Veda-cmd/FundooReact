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
let data = require('./test.json')

chai.use(chaiHttp);

describe('Register User',()=>
{
    it('User registration is successful',(done)=>
    {
        let person = data.registerSuccess;
        chai.request(server)
        .post('/register')
        .send(person)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a('object');
            res.body.should.have.property('email');
            res.body.should.have.property('shortUrl');
        done();
        })
    });

    it('Should not register a user with any missing field',(done)=>
    {
        let person = data.registerIncomplete;
        chai.request(server)
        .post('/register')
        .send(person)
        .end((err, res) => {
            res.should.have.status(422);
            res.should.be.a('object');
            res.body.errors[1].should.have.property('location');
            res.body.errors[1].should.have.property('param');
        done();
        })
    });

    it('First name should be min. 3 characters',(done)=>
    {
        let person = data.firstNameLength;
        chai.request(server)
        .post('/register')
        .send(person)
        .end((err, res) => {
            res.should.have.status(422);
            res.should.be.a('object');
            res.body.errors[0].should.have.property('msg');
            res.body.errors[0].should.have.property('value');
        done();
        })
    });

    it('Last name cannot be empty',(done)=>
    {
        let person = data.lastNameEmpty;
        chai.request(server)
        .post('/register')
        .send(person)
        .end((err, res) => {
            res.should.have.status(422);
            res.should.be.a('object');
            res.body.errors[0].should.have.property('param');
            res.body.errors[0].should.have.property('value');
        done();
        })
    });

    it('Email should be valid',(done)=>
    {
        let person = data.emailValid;
        chai.request(server)
        .post('/register')
        .send(person)
        .end((err, res) => {
            res.should.have.status(422);
            res.should.be.a('object');
            res.body.errors[0].should.have.property('param');
            res.body.errors[0].should.have.property('msg');
        done();
        })
    });

    it('Password should be min. 6 characters',(done)=>
    {
        let person = data.passwordLength;
        chai.request(server)
        .post('/register')
        .send(person)
        .end((err, res) => {
            res.should.have.status(422);
            res.should.be.a('object');
            res.body.errors[0].should.have.property('msg','Invalid password');
            res.body.errors[0].should.have.property('param');
        done();
        })
    });

    it('Email is already registered',(done)=>
    {
        let person = data.emailRegistered;
        chai.request(server)
        .post('/register')
        .send(person)
        .end((err, res) => {
            res.should.have.status(422);
            res.should.be.a('object');
            res.body.should.have.property('message');
        done();
        })
    });
})
