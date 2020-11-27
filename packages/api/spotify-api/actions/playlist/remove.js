const axios = require('axios').default
const { SPOTIFY_ACTIONS_API } = require('../../consts')
const { bearer } = require('../../lib/getAuthHeader')
const refreshAuthToken = require('../../lib/refreshAuthToken')

module.exports = async ({ activeUsers }, id, songUri) => {
  const { playlistId, expiresIn } = activeUsers[id]

  if (!expiresIn > new Date()) {
    await refreshAuthToken(activeUsers, id)
  }

  await axios({
    url: `${SPOTIFY_ACTIONS_API}/playlists/${playlistId}/tracks`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...bearer(id, activeUsers),
    },
    data: {
      tracks: [{ uri: songUri }],
    },
  })
}
