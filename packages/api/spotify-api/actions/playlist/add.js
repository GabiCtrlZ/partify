const axios = require('axios').default
const { SPOTIFY_ACTIONS_API } = require('../../consts')
const { bearer } = require('../../lib')

module.exports = async (
  playlistId,
  token,
  songUri,
) => {
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
