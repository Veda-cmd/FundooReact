/**
* @description: 
* @file: uploadImage.js
* @author: Vedant Nare
* @version: 1.0
*/

/**
*@description Dependencies are installed for execution. 
*/

let fs =require('fs')
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Image upload test',()=>
{
    it('Image upload successful',(done)=>
    {
        chai.request(server)
        .post('/api/upload')
        .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYmE4YTNkOTM3YWY4NDgzMDQ2ZDRlZiIsImVtYWlsIjoidmVkYW50Lm5hcmUwNEBnbWFpbC5jb20iLCJpYXQiOjE1NzI2ODY5OTAsImV4cCI6MTU3MjczMDE5MH0.DDQL-bK23yHUh1WykH_kvSjIKpelqvccXa4bmGni1uM")
        .attach('image',fs.readFileSync(__dirname+'/cool.jpeg'),'cool.jpeg')
        .end((err,res)=>
        {
            res.should.have.status(200);
            res.should.be.a('object');
            done();
        });
    });
    
    it('Image should be jpeg or png type',(done)=>
    {
        chai.request(server)
        .post('/api/upload')
        .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYmE4YTNkOTM3YWY4NDgzMDQ2ZDRlZiIsImVtYWlsIjoidmVkYW50Lm5hcmUwNEBnbWFpbC5jb20iLCJpYXQiOjE1NzI2ODY5OTAsImV4cCI6MTU3MjczMDE5MH0.DDQL-bK23yHUh1WykH_kvSjIKpelqvccXa4bmGni1uM")
        .attach('image',fs.readFileSync(__dirname+'/token.txt'),'token.txt')
        .end((err,res)=>
        {
            res.should.have.status(422);
            res.should.be.a('object');
            done();
        });
    });

});