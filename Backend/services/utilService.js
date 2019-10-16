const bcrypt = require('bcrypt');

hashPassword = (req) =>
{
    return new Promise((resolve,reject)=>
    {
        bcrypt.hash(req,10)
        .then(data=>
        {   
            resolve(data);
        })
        .catch(err=>
        {
            reject(err);
        })
    })
}

module.exports={hashPassword};