/**
* @description: 
* @file: resetTest.js
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

describe('Reset Password',()=>
{
    it('Reset password successful',(done)=>
    {
        let person = data.resetSuccess;
        chai.request(server)
        .post('/reset')
        .set('token',data.resetWithToken.headers)
        .send(person)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a('object');
            res.body.should.have.property('message');
        done();
        });
    });

    it('Reset error due to missing fields',(done)=>
    {
        let person = data.resetIncomplete;
        chai.request(server)
        .post('/reset')
        .set('token',data.resetWithToken.headers)
        .send(person)
        .end((err, res) => {
            res.should.have.status(422);
            res.should.be.a('object');
            res.body.errors[0].should.have.property('param');
            res.body.errors[0].should.have.property('msg');
        done();
        });
    });

    it('Reset password should have token in headers',(done)=>
    {
        let person = data.resetWithoutToken;
        chai.request(server)
        .post('/reset')
        .send(person)
        .end((err, res) => {
            res.should.have.status(422);
            res.should.be.a('object');
            res.body.should.have.property('message');
            done();
        });
    });

    it('Reset password contains only token',(done)=>
    {
        let person = {};
        chai.request(server)
        .post('/reset')
        .set('token',data.resetWithToken.headers)
        .send(person)
        .end((err, res) => {
            res.should.have.status(422);
            res.should.be.a('object');
            res.body.errors[0].should.have.property('param');
            res.body.errors[0].should.have.property('msg');
            done();
        });
    });
});