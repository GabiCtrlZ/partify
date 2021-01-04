const Lru = require('../../lib/lru-timestamp')

const {
  spotifyActions: {
    playlistActions: {
      getTracksFromPlaylist,
    },
  },
} = require('../../lib/init-spotify-api')

const { LRU_MAX_SIZE, POOLING_DELAY } = require('../../consts')

const lru = new Lru(LRU_MAX_SIZE)

module.exports = async (req, res) => {
  const {
    logger,
    session,
  } = req

  const {
    playlistId,
    token,
  } = session

  try {
    if (!lru.checkTimeValid(playlistId, POOLING_DELAY)) {
      logger.info('time isnt valid, sending request')
      lru.set(playlistId, getTracksFromPlaylist(
        playlistId,
        token,
        logger,
      ))
    }

    const songs = await lru.get(playlistId).value

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
