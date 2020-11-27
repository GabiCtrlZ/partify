/* eslint-disable consistent-return */
const Joi = require('@hapi/joi')
const withSchema = require('../lib/with-schema')

const schema = Joi.object().keys({
  name: Joi.string().required(),
})

module.exports = withSchema(schema, 'body')(async (req, res, next) => {
  const {
    body,
    logger,
  } = req

  try {
    const { name } = body
    logger.info('got the following data', body)

    logger.info('creating new session') // need to create session and spotify instance
    const room = 5 // need to change to created room id from session create

    req.user = {
      name,
      room,
      role: 'admin',
    }

    logger.info('created session successfully, moving on')
    return next()
  } catch (e) {
    logger.info('error with create middleware', { message: e.toString() })

    return res.status(500).json({
      success: false,
      message: e,
    })
  }
})
