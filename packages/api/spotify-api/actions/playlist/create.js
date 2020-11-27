const axios = require('axios').default
const { SPOTIFY_ACTIONS_API } = require('../../consts')
const { bearer } = require('../../lib/getAuthHeader')
const refreshAuthToken = require('../../lib/refreshAuthToken')

module.exports = async (
  { activeUsers, setKeyInActiveUser },
  id,
) => {
  const { spotifyId, expiresIn } = activeUsers[id]

  if (!expiresIn > new Date()) {
    await refreshAuthToken(activeUsers, id)
  }

  const { data } = await axios({
    url: `${SPOTIFY_ACTIONS_API}/users/${spotifyId}/playlists`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...bearer(id, activeUsers),
    },
    data: {
      name: `Partify ${id.substring(0, 3)}`,
    },
  })

  const { id: playlistId } = data

  setKeyInActiveUser(id, 'playlistId', playlistId)
}
