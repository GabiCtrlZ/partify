const express = require('express')
const path = require('path')
const listEndpoints = require('express-list-endpoints')

const { createExpressLogger, logger } = require('./src/lib/logger')

const { init: initApp, addUnknownRouteHandler } = require('./src/lib/init-app')
const initDb = require('./src/lib/init-db.js')

const {
  PORT,
  CLIENT_BUILD_PATH,
} = require('./src/consts')

const api = require('./src/routes')

const bootstrap = async (app) => {
  await initDb()
  logger.info('connected to the db successfully')

  await initApp(app)

  createExpressLogger(app)

  app.use('/', express.static(path.join(__dirname, CLIENT_BUILD_PATH)))

  app.use('/api/v1', [], api)

  app.get('/*', (req, res) => {
    res.header('Cache-Control', 'no-cache')
    res.sendFile(path.join(__dirname, CLIENT_BUILD_PATH, 'index.html'))
  })

  await addUnknownRouteHandler(app)

  if (!PORT) {
    logger.error('missing port, unable to start express server')
    return process.exit(1)
  }

  return app.listen(PORT, () => {
    logger.info(`server is up and running on ${PORT}`)
    logger.info('application endpoints:', listEndpoints(app))
  })
}

const app = express()

bootstrap(app)

process.on('uncaughtException', async (error) => {
  logger.error('uncaughtException', {
    stack: error.stack, message: error.toString(),
  })
})

process.on('unhandledRejection', async (reason) => {
  logger.error('unhandledRejection', {
    stack: reason.stack, message: reason.toString(),
  })
})

process.on('SIGINT', () => {
  process.exit()
})
