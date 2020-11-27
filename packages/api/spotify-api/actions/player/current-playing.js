const axios = require('axios').default
const { SPOTIFY_ACTIONS_API } = require('../../consts')
const { bearer } = require('../../lib')

module.exports = async (token, logger) => {
  const { data } = await axios({
    url: `${SPOTIFY_ACTIONS_API}/me/player/currently-playing`,
    method: 'GET',
    headers: {
      ...bearer(token),
    },
  })

  const {
    item: { id: songId },
  } = data

  logger.info(`currently playing song with id ${songId}`)

  return songId
}
