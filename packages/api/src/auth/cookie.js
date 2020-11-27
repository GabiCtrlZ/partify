const jwt = require('./jwt')

const {
  COOKIE_NAME,
  COOKIE_OPTIONS,
  LOCAL_DEV,
  DISABLE_COOKIE_SECURITY,
} = require('../consts')

const cookie = async (req, res, next) => {
  const { logger } = req
  try {
    const options = {
      ...COOKIE_OPTIONS,
    }

    if (!LOCAL_DEV && !DISABLE_COOKIE_SECURITY) {
      options.sameSite = 'strict'
      options.secure = true
    }

    logger.info('creating cookie')

    const token = await jwt.sign(req.user)

    logger.info('finished creating cookie')

    res.cookie(COOKIE_NAME, token, options)
    next()
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e,
      message: 'some problem with creating the cookie',
    })
  }
}

module.exports = cookie
