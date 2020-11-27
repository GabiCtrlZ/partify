const Joi = require('@hapi/joi')
const {
  Session,
} = require('../../models')

const withSchema = require('../../lib/with-schema')

const schema = Joi.object().keys({
  songId: Joi.string().required(),
})

module.exports = withSchema(schema, 'body')(async (req, res) => {
  const { logger, user, body } = req
  try {
    const { room } = user
    const { songId } = body
    logger.info('getting room data') // get all songs and stuff

    const session = await Session.findOne({ isAlve: true, room }).exec()

    logger.info('removed song id from session', { songId, session }) // get all songs and stuff

    return res.json({
      success: true,
    })
  } catch (e) {
    logger.info(`error with route ${req.url}`, { message: e.toString() })

    return res.status(500).json({
      success: false,
      message: e,
    })
  }
})
