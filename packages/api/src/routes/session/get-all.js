const {
  spotifyActions: { playlistActions },
} = require('../../../initSpotifyApi')

module.exports = async (req, res) => {
  const {
    logger,
    session,
  } = req

  const {
    playlistId,
    expiresIn,
    token,
  } = session

  const {
    getTracksFromPlaylist,
  } = playlistActions

  try {
    const songs = await getTracksFromPlaylist(
      playlistId,
      expiresIn,
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
