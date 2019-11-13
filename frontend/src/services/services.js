import axios from 'axios';

const baseUrl = 'http://localhost:5000';

export function register(request,callback)
{
    axios.post(baseUrl+'/register',request).then(response=>
    {
        return callback(null,response);
    })
    .catch(error=>
    {
        return callback(error);
    })
}

export function login(request,callback)
{
    axios.post(baseUrl+'/login',request).then(response=>
    {
        return callback(null,response);
    })
    .catch(error=>
    {
        return callback(error);
    })
}