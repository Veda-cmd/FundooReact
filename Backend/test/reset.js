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
        .end((err, res) => 
        {
            if(err)
            {
                res.should.have.status(422);
                res.should.be.a('object');
            }
            else
            {
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('message');
            }
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

    it('New password cannot be same as old password',(done)=>
    {
        let person = data.resetSame;
        chai.request(server)
        .post('/reset')
        .set('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkaXR5YXRob3JhdDE5QGdtYWlsLmNvbSIsImlkIjoiNWRiZmFiY2NiZWMzYzMyMWMxOTU0ZjhkIiwiaWF0IjoxNTcyODYxODgzLCJleHAiOjE1NzI5MDUwODN9.YH1A3j3MtJCCZYP8chndx1iiLzHalKr0ebcYO_XTtnI")
        .send(person)
        .end((err, res) => {
            res.should.have.status(422);
            res.should.be.a('object');
            res.body.should.have.property('message');
            done();
        });
    });

    it('Expired token cannot be used',(done)=>
    {
        let person = data.resetSame;
        chai.request(server)
        .post('/reset')
        .set('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZlZGFudC5uYXJlMDRAZ21haWwuY29tIiwiaWQiOiI1ZGJkNjhhY2YzMDgxNjBmMjQzNDEzYmEiLCJpYXQiOjE1NzI2OTQ0NTQsImV4cCI6MTU3MjczNzY1NH0.kkciXYIudqpk9hVKw2dUj6crZCzFM-r7WqQzcwKo5mA")
        .send(person)
        .end((err, res) => {
            res.should.have.status(422);
            res.should.be.a('object');
            done();
        });
    });

    it('Tokens should be same',(done)=>
    {
        let person = data.resetSame;
        chai.request(server)
        .post('/reset')
        .set('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkaXR5YXRob3JhdDE5QGdtYWlsLmNvbSIsImlkIjoiNWRiZmFiY2NiZWMzYzMyMWMxOTU0ZjhkIiwiaWF0IjoxNTcyODYwNDk2LCJleHAiOjE1NzI5MDM2OTZ9.KmP4w7vNvOPtV3OLOGtKT1GPDCmuyDQ6QbRlsiCF4tE")
        .send(person)
        .end((err, res) => {
            res.should.have.status(422);
            res.should.be.a('object');
            done();
        });
    });

});