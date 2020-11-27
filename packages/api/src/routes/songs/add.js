const {
  spotifyActions: { playlistActions },
} = require('../../lib/init-spotify-api')

module.exports = async (req, res) => {
  const {
    logger,
    session,
    body,
  } = req

  const {
    songUri,
  } = body

  const {
    playlistId,
    expiresIn,
    token,
    roomId,
  } = session

  const {
    addToPlaylist,
  } = playlistActions

  try {
    await addToPlaylist(playlistId, expiresIn, token, songUri)

    logger.info('added song uri to session', { songUri, roomId })

    return res.json({
      success: true,
    })
  } catch (e) {
    logger.info(`error with route ${req.url}`, {
      message: e.toString(),
    })

    return res.status(500).json({
      success: false,
      message: e,
    })
  }
}
