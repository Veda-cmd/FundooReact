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

export function forgot(request,callback)
{
    axios.post(baseUrl+'/forgot',request).then(response=>
    {
        return callback(null,response);
    })
    .catch(error=>
    {
        return callback(error);
    })
}

export function verify(request,callback)
{
    axios.post(baseUrl+'/verify',null,{params:{url:request}}).then(response=>
    {
        return callback(null,response);
    })
    .catch(error=>
    {
        return callback(error);
    })
}

export function reset(request,callback)
{
    axios.post(baseUrl+'/reset',request,{headers:{token:request.token}}).then(response=>
    {
        return callback(null,response);
    })
    .catch(error=>
    {
        return callback(error);
    });
}

export function createNote(request,callback)
{
    axios.post(baseUrl+'/note/addNote',request,{headers:{token:sessionStorage.getItem('token')}})
    .then(response=>
    {
        return callback(null,response);
    })
    .catch(error=>
    {
        return callback(error);
    });
}

export const isLogin = () => {
    if (sessionStorage.getItem('token')) {
        return true;
    }
    return false;
}