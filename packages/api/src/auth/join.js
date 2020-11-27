/* eslint-disable consistent-return */
const Joi = require('@hapi/joi')
const withSchema = require('../lib/with-schema')

const schema = Joi.object().keys({
  name: Joi.string().required(),
  roomId: Joi.string().required(),
})

module.exports = withSchema(schema, 'body')(async (req, res, next) => {
  const {
    body,
    logger,
  } = req

  try {
    const { name, roomId } = body
    logger.info('got the following data', body)

    logger.info(`querying database for room ${roomId}`) // need to query db for live session with room id

    req.user = {
      name,
      roomId,
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
