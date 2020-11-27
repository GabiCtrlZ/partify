/* eslint-disable consistent-return */
const { Session } = require('../models')

module.exports = async (req, res, next) => {
  const { user, logger } = req

  try {
    const { roomId } = user

    logger.info('quering db for session')

    const session = await Session.findOne({ roomId, isAlive: true }).lean().exec()

    if (!session) return logger.error(`Couldnt not find session for ${roomId}`)

    req.session = session

    logger.info('session was found successfully, moving on')

    return next()
  } catch (e) {
    logger.info('error with create middleware', {
      message: e.toString(),
    })

    return res.status(500).json({
      success: false,
      message: e,
    })
  }
}
