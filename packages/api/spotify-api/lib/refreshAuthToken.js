/* eslint-disable camelcase */
const axios = require('axios').default
const qs = require('querystring')
const { SPOTIFY_ACCOUNTS_API } = require('../consts')
const { basic } = require('./getAuthHeader')

module.exports = async (
  refresh_token,
) => {
  const { data } = await axios({
    url: `${SPOTIFY_ACCOUNTS_API}/api/token`,
    method: 'POST',
    headers: {
      ...basic,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  })

  return data
}
