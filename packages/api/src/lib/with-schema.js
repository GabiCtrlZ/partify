const get = require('lodash/get')

const getErrorJsonResponse = (m, config) => {
  const { errorResponse } = config
  switch (typeof errorResponse) {
  case 'function':
    return errorResponse(m)
  case 'object':
    return errorResponse
  default:
    return null
  }
}

const withSchema = (schema, dataPath, settings) => (next) => async (...args) => {
  const [req, res] = args

  const config = settings || withSchema.config
  const {
    errorStatus = 400,
  } = config

  try {
    const data = get(req, dataPath)
    await schema.validateAsync(data)
    await next(...args)
  } catch (e) {
    let error

    try {
      const { details = [] } = e
      const { message } = details[0]

      error = message
    } catch (e2) {
      error = e.toString()
    }

    if (req.logger) {
      req.logger.warn(`unable to validate schema: ${error} in route ${req.url}`)
    }

    const response = getErrorJsonResponse(error, config)
    if (response) {
      res.status(errorStatus).json(response)
    } else {
      res.sendStatus(errorStatus)
    }
  }
}

withSchema.config = {
  errorStatus: 400,
  errorResponse: { success: false },
}

module.exports = withSchema
