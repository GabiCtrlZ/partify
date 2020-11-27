const { v4 } = require('uuid')

module.exports = ({ startUserAuthCycle }) => (
  req,
  res,
  next,
) => {
  const { logger } = req
  const newRoomId = v4().split('-')[0]

  logger.info(`New user in login route got id ${newRoomId}`)

  req.state = newRoomId
  startUserAuthCycle(newRoomId)
  next()
}
