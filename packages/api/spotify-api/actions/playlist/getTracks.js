const axios = require('axios').default
const { SPOTIFY_ACTIONS_API } = require('../../consts')
const { bearer } = require('../../lib/getAuthHeader')
const { refactorSongsRes } = require('../../lib')
const { currentlyPlaying } = require('../player')

module.exports = async (
  playlistId,
  token,
  logger,
) => {
  const { data } = await axios({
    url: `${SPOTIFY_ACTIONS_API}/playlists/${playlistId}/tracks?fields=items(track(name,id,uri,album(name,images,artists(name))))`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...bearer(token),
    },
  })

  const { items } = data

  logger.info('got success from spotify api with')
  logger.info(items)

  const currentlyPlayingSongId = await currentlyPlaying(
    token,
    logger,
  )

  return refactorSongsRes(items, currentlyPlayingSongId)
}
