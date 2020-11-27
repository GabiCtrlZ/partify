const { v4 } = require('uuid')

module.exports = ({ startUserAuthCycle }) => (
  req,
  res,
  next
) => {
  const { logger } = req
  const newUserId = v4()

  logger.info(`New user in login route got id ${newUserId}`)

  req.state = newUserId
  startUserAuthCycle(newUserId)
  next()
}
