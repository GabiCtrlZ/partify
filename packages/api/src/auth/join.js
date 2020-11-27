/* eslint-disable consistent-return */
const Joi = require('@hapi/joi')
const withSchema = require('../lib/with-schema')

const schema = Joi.object().keys({
  name: Joi.string().required(),
  room: Joi.string().required(),
})

module.exports = withSchema(schema, 'body')(async (req, res, next) => {
  const {
    body,
    logger,
  } = req

  try {
    const { name, room } = body
    logger.info('got the following data', body)

    logger.info(`querying database for room ${room}`) // need to query db for live session with room id

    req.user = {
      name,
      room,
      role: 'user',
    }

    logger.info('found room successfully, moving on')
    return next()
  } catch (e) {
    logger.info('error with join middleware', { message: e.toString() })

    return res.status(500).json({
      success: false,
      message: e,
    })
  }
})
