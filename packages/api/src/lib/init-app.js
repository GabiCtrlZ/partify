const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const compression = require('compression')

const init = (app) => new Promise((resolve) => {
  app.use(compression())
  app.use(helmet({
    contentSecurityPolicy: false,
  }))

  app.use(bodyParser.json({
    limit: '50mb', extended: true,
  }))
  app.use(bodyParser.urlencoded({
    limit: '50mb', extended: true,
  }))

  app.use(cookieParser())

  app.get('/healthz', (req, res) => res.status(200).json({
    statusCode: 200,
    status: 'OK',
    version: '1.0',
  }))

  app.use((err, req, res, next) => { // eslint-disable-line
    logger.error(`internal express error ${JSON.stringify({ message: err.toString(), stack: err.stack })}`) // eslint-disable-line

    res.status(500).json({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'An internal server error occurred',
    })
  })

  return resolve()
})

const addUnknownRouteHandler = (app) => new Promise((resolve) => {
  app.get('/*', (req, res) => res.status(404).json({
    statusCode: 404,
    error: 'Not Found',
    message: 'Missing',
  }))

  app.post('/*', (req, res) => res.status(404).json({
    statusCode: 404,
    error: 'Not Found',
    message: 'Missing',
  }))

  return resolve()
})

module.exports = {
  init,
  addUnknownRouteHandler,
}
