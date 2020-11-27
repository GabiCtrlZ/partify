const {
  spotifyActions: { playlistActions },
} = require('../../lib/init-spotify-api')

module.exports = async (req, res) => {
  const {
    logger,
    session,
  } = req

  const {
    playlistId,
    token,
  } = session

  const {
    getTracksFromPlaylist,
  } = playlistActions

  try {
    const songs = await getTracksFromPlaylist(
      playlistId,
      token,
      logger,
    )

    return res.json({
      success: true,
      data: {
        songs,
      },
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
