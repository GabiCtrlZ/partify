const log4js = require('log4js')

const logger = log4js.getLogger()
logger.level = 'info'

const createExpressLogger = (app) => {
  app.use((req, res, next) => {
    req.logger = logger
    next()
  })

  app.use((log4js.connectLogger(logger, {
    level: 'auto',
    format: (req, res, format) => format(`:remote-addr :method :url body:${JSON.stringify(req.body)}`),
  })))
}

module.exports = {
  createExpressLogger,
  logger,
}
