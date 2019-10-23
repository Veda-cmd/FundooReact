const winston = require('winston');

let logConfiguration = {
    "transports":[
        new winston.transports.File({
            filename : './logs/fundoo.log'
        }),
        new winston.transports.Console()
    ]
}

let logger = winston.createLogger(logConfiguration);

module.exports = logger;