/* eslint-disable camelcase */
const axios = require('axios').default
const { SPOTIFY_ACTIONS_API } = require('../../consts')
const { bearer } = require('../../lib/getAuthHeader')

module.exports = async (
  { activeUsers, initActiveUser },
  id,
) => {
  const { data } = await axios({
    url: `${SPOTIFY_ACTIONS_API}/me`,
    method: 'GET',
    headers: bearer(id, activeUsers),
  })

  const {
    display_name,
    images: { url: image },
    id: spotifyId,
  } = data

  initActiveUser(id, spotifyId, display_name, image)
}
