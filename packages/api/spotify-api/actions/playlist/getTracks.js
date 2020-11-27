const axios = require('axios').default
const { SPOTIFY_ACTIONS_API } = require('../../consts')
const { bearer } = require('../../lib/getAuthHeader')
const refreshAuthToken = require('../../lib/refreshAuthToken')

module.exports = async ({ activeUsers }, id) => {
  const { playlistId, expiresIn } = activeUsers[id]

  if (!expiresIn > new Date()) {
    await refreshAuthToken(activeUsers, id)
  }

  const { data } = await axios({
    url: `${SPOTIFY_ACTIONS_API}/playlists/${playlistId}/tracks?fields=items(track(name,id,uri,album(name,images,artists(name))))`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...bearer(id, activeUsers),
    },
  })

  const { items } = data

  return items.map(
    ({
      name,
      id: songId,
      uri,
      album: { name: albumName, images, artists },
    }) => ({
      name,
      songId,
      uri,
      album: albumName,
      image: images[0].url,
      artist: artists[0].name,
    }),
  )
}
