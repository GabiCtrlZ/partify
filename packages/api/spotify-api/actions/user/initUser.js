/* eslint-disable camelcase */
const axios = require('axios').default
const { SPOTIFY_ACTIONS_API } = require('../../consts')
const { bearer } = require('../../lib')

module.exports = async (token, logger) => {
  const { data } = await axios({
    url: `${SPOTIFY_ACTIONS_API}/me`,
    method: 'GET',
    headers: bearer(token),
  })

  const { display_name, images, id: spotifyId } = data

  logger.info(`Got success in init user with { display_name: ${display_name}, image: ${images[0].url}, spotifyId: ${spotifyId} }`)

  return {
    spotifyId,
    hostImage: images[0].url,
    hostName: display_name,
  }
}
