const axios = require('axios').default

module.exports = async (options) => {
  const { data } = await axios(...options)
  return data
}
