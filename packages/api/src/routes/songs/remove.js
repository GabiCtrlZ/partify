const Joi = require('@hapi/joi')
const withSchema = require('../../lib/with-schema')

const { spotifyActions } = require('../../lib/init-spotify-api')

const schema = Joi.object().keys({
  songUri: Joi.string().required(),
})

module.exports = withSchema(schema, 'body')(async (req, res) => {
  const {
    logger,
    body,
    session,
  } = req

  try {
    const {
      token,
      playlistId,
      roomId,
    } = session

    const {
      songUri,
    } = body

    const {
      playlistActions: {
        removeFromPlaylist,
      },
    } = spotifyActions

    await removeFromPlaylist(playlistId, token, songUri)

    logger.info('removed song uri from session', { songUri, roomId })

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
