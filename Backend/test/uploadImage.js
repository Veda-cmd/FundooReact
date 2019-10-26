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
    it('Image should be of jpeg file type',(done)=>
    {
        chai.request(server)
        .post('/api/upload')
        .field({email:'vedant.nare04@gmail.com'})
        .attach('element1',fs.readFileSync(__dirname+'/cool.jpeg'),'cool.jpeg')
        .end((err,res)=>
        {
            res.should.have.status(200);
            res.should.be.a('object');
            done();
        })
        
    })
    
})