const {
  Session,
} = require('../../models')

module.exports = async (req, res) => {
  const { logger, user } = req
  try {
    const { room } = user
    logger.info('getting room data') // get all songs and stuff
    await Session.findOneAndDelete({ isAlve: true, room }).exec()

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
}
