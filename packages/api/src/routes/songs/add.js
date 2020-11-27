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
    token,
    roomId,
  } = session

  const {
    addToPlaylist,
  } = playlistActions

  try {
    logger.info('adding song to room id', { songUri, roomId })

    await addToPlaylist(playlistId, token, songUri)

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
