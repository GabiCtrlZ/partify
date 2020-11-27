const { CLIENT_ID, CLIENT_SECRET } = require('../consts')

module.exports = {
  bearer: (token) => ({
    Authorization: `Bearer ${token}`,
  }),
  basic: {
    Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
  },
}
