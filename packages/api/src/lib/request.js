const axios = require('axios').default

module.exports = async ({
  url,
  data,
  logger,
  method,
  options,
}) => {
  try {
    const res = await axios({
      url,
      data,
      method,
      ...options,
    })
    return res
  } catch (e) {
    logger.error(e)
    return e
  }
}
