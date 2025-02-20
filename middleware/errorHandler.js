const winston = require('winston')

const{timestamp, combine, prettyPrint, json, colorize} = winston.format
const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    json(),
    prettyPrint(),
    colorize()  
  ),
  transports: [
    new winston.transports.File({filename: 'error.log'}),
    new winston.transports.Console()
  ],
  exceptionHandlers:[
    new winston.transports.File({filename: 'exceptions.log'}),
    new winston.transports.Console()
  ],
  rejectionHandlers: [
    new winston.transports.File({filename: 'rejections.log'}),
    new winston.transports.Console()
  ]
})


const errorHandler = (err, req, res, next)=>{
  logger.error(err.message)
  res.status(500).send('Something went wrong', err.message)
}

module.exports = {errorHandler, logger}