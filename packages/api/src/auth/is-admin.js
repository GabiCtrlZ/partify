module.exports = async (req, res, next) => {
  const { logger } = req
  try {
    const { role } = req.user
    if (role === 'admin') {
      return next()
    }

    return res.status(401).send({ success: false, message: 'You cant do that' })
  } catch (e) {
    logger.info('error with is-admin route', { message: e.toString() })

    return res.status(500).json({
      success: false,
      message: e,
    })
  }
}
