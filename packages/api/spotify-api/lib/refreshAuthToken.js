/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
const axios = require('axios').default
const { SPOTIFY_ACCOUNTS_API } = require('../consts')
const { basic } = require('./getAuthHeader')

module.exports = async (
  activeUsers,
  id,
) => {
  const { refreshToken: refresh_token } = activeUsers[id]

  const { data } = await axios({
    url: `${SPOTIFY_ACCOUNTS_API}/api/token`,
    method: 'POST',
    headers: basic,
    data: {
      grant_type: 'refresh_token',
      refresh_token,
    },
  })

  const { access_token } = data

  activeUsers[id].token = access_token
}
