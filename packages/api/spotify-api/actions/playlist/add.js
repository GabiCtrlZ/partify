const axios = require('axios').default
const { SPOTIFY_ACTIONS_API } = require('../../consts')
const { bearer } = require('../../lib/getAuthHeader')
const refreshAuthToken = require('../../lib/refreshAuthToken')

module.exports = async (
  playlistId,
  expiresIn,
  token,
  songUri,
) => {
  if (!expiresIn > new Date()) {
    await refreshAuthToken()
  }

  await axios({
    url: `${SPOTIFY_ACTIONS_API}/playlists/${playlistId}/tracks`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...bearer(token),
    },
    data: {
      uris: [songUri],
    },
  })
}
