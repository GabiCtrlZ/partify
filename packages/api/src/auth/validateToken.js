/* eslint-disable camelcase */
const { Session } = require('../models')
const {
  refreshAuthToken,
} = require('../../spotify-api/lib')

module.exports = async (req, res, next) => {
  const {
    logger,
    session: { expiresIn, refreshToken, roomId },
  } = req

  try {
    if (expiresIn > new Date()) {
      logger.warn('token is expired updating session with new token')

      const {
        access_token,
        expires_in,
      } = await refreshAuthToken(refreshToken)

      const newSession = await Session.findOneAndUpdate(
        { roomId },
        {
          token: access_token,
          expiresIn: new Date(
            new Date().getTime() + expires_in * 1000,
          ),
        },
        { new: true },
      )
        .lean()
        .exec()

      req.session = newSession
    }
    logger.info('token is valid, moving on')

    return next()
  } catch (e) {
    logger.info('error with validate token middleware', {
      message: e.toString(),
    })

    return res.status(500).json({
      success: false,
      message: e,
    })
  }
}
