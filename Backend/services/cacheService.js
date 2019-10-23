const redis = require('redis');
const redisClient = redis.createClient();
const logger = require('./logService');

redisClient.on('connect',()=>
{
    logger.info('Redis client connected');
})
redisClient.on('error',(err)=>
{
    logger.error('Something went wrong ' + err);
})

class cacheService
{
    set(key,value,callback)
    {
        redisClient.set(key,value,(err,result)=>
        {
            if(err)
                callback(err);
            else
                callback(null,result);
        })
    }

    get(key,callback)
    {
        redisClient.get(key,(err,result)=>
        {
            if(err)
                callback(err);
            else
                callback(null,result);
        });
    }

    delete(key,callback)
    {
        redisClient.del(key,(err,result)=>
        {
            if(err)
                callback(err);
            else
                callback(null,result);
        });
    }

    exist(key,callback)
    {
        redisClient.exists(key,(err,result)=>
        {
            if(err)
                callback(err);
            else
                callback(null,result);
        });
    }
}

module.exports = new cacheService();