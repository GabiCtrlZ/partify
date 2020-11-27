const Joi = require('@hapi/joi')
const withSchema = require('../../lib/with-schema')
const { searchActions } = require('../../../spotify-api/actions')

const schema = Joi.object().keys({
  searchVal: Joi.string().required(),
})

module.exports = withSchema(schema, 'body')(async (req, res) => {
  const {
    logger,
    session,
    body,
  } = req

  const {
    search,
  } = searchActions

  try {
    const {
      searchVal,
    } = body

    const {
      token,
    } = session

    logger.info(`searching for song with searchVal: ${searchVal}`)

    const songs = await search(token, searchVal)

    return res.json({
      success: true,
      data: {
        songs,
      },
    })
  } catch (e) {
    logger.info(`error with route ${req.url}`, { message: e.toString() })

    return res.status(500).json({
      success: false,
      message: e,
    })
  }
})
