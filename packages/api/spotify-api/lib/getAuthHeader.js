const { CLIENT_ID, CLIENT_SECRET } = require('../consts')

module.exports = {
  bearer: (id, activeUsers) => ({
    Authorization: `Bearer ${activeUsers[id].token}`,
  }),
  basic: {
    Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
  },
}
