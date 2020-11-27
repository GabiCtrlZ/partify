const {
  Session,
} = require('../../models')

module.exports = async (req, res) => {
  const { logger, user } = req
  try {
    const { room } = user
    logger.info('getting room data') // get all songs and stuff

    const session = await Session.findOne({ isAlve: true, room }).lean().exec()
    // use session key to get all playlist songs
    logger.info(session)

    return res.json({
      success: true,
      data: {
        songs: [{
          id: 1,
          name: 'savior',
          album: 'appeal to reason',
          artist: 'rise against',
          img: 'https://raw.githubusercontent.com/GabiCtrlZ/Currency/master/packages/readme-pics/search-tab.jpeg',
        }],
      },
    })
  } catch (e) {
    logger.info(`error with route ${req.url}`, { message: e.toString() })

    return res.status(500).json({
      success: false,
      message: e,
    })
  }
}
