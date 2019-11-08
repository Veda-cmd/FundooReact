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

describe('Verify Mail',()=>
{
    it('User Verification successful',(done)=>
    {
        chai.request(server)
        .post('/gL6mw-9m')
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

    it('User email not found in database',(done)=>
    {
        chai.request(server)
        .post('/dsadasdas')
        .end((err, res) => 
        {
            res.should.have.status(422);
            res.should.be.a('object');
            res.body.should.have.property('message');
        done();
        });
    });
});