const redis = require('../services/cache');
const logger = require('../services/log');

class cacheController
{
    cacheNotes(req,res,next)
    {
        let key = 'getAllNotes'+req.decoded.email;

        redis.get(key,(err,data)=>
        {
            if(err)
            {
                res.status(422).send(err);
            }
            else
            {
                if(data == null)
                {
                    logger.info('Data not found in cache');
                    next();
                }
                else
                {
                    logger.info('Data found in cache');
                    res.status(200).send(JSON.parse(data));
                }
            }
        });
    }

    cacheListings(req,res,next)
    {      
        let key = Object.keys(req.query)[0]+req.decoded.email;
        console.log(key);
        
        redis.get(key,(err,data)=>
        {
            if(err)
            {
                res.status(422).send(err);
            }
            else
            {
                if(data == null)
                {
                    logger.info('Data not found in cache');
                    next();
                }
                else
                {
                    logger.info("Fetched from cache");
                    res.status(200).send(JSON.parse(data));
                }
            }
        });
    }
}

module.exports = new cacheController();