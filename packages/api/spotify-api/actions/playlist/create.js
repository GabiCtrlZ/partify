const axios = require('axios').default
const { SPOTIFY_ACTIONS_API } = require('../../consts')
const { bearer } = require('../../lib')

module.exports = async (
  roomId,
  token,
  spotifyId,
  logger,
) => {
  logger.info('Creating new playlist')

  logger.info(`sending requset to spotify api with { spotifyId: ${spotifyId} }`)

  const { data } = await axios({
    url: `${SPOTIFY_ACTIONS_API}/users/${spotifyId}/playlists`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...bearer(token),
    },
    data: {
      name: `Partify ${roomId.substring(0, 4)}`,
    },
  })

  const { id: playlistId } = data

  logger.info(`Got success from spotify api with { playlistId: ${playlistId} }`)

  return playlistId
}
