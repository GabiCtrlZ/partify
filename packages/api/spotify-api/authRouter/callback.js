/* eslint-disable camelcase */
const axios = require('axios').default
const qs = require('querystring')
const { SPOTIFY_ACCOUNTS_API } = require('../consts')
const { basic } = require('../lib/getAuthHeader')
const { userActions, playlistActions } = require('../actions')
const { Session } = require('../../src/models')

module.exports = ({
  apiCallback,
  clientCallback,
  setupNewActiveUser,
  isIdInAuthCycle,
  stopUserAuthCycle,
}) => async (req, res) => {
  const { query: { code, state: roomId } = {}, logger } = req
  const { initUser } = userActions
  const { createPlaylist } = playlistActions

  logger.info(`Got success on callback with query { code: ${code}, state: ${roomId} }`)

  try {
    if (isIdInAuthCycle(roomId)) {
      logger.info(`${roomId} is in auth cycle sending code to spotify api token`)

      logger.info(`sending request to spotify api token with { code: ${code}, redirect_uri: ${apiCallback} }`)

      const { data } = await axios({
        url: `${SPOTIFY_ACCOUNTS_API}/api/token`,
        method: 'POST',
        headers: {
          ...basic,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
          code,
          redirect_uri: apiCallback,
          grant_type: 'authorization_code',
        }),
      })

      const {
        access_token,
        refresh_token,
        expires_in,
      } = data

      logger.info(`Got success response from spotify api token with response { access_token: ${access_token}, refresh_token: ${refresh_token}, expires_in: ${expires_in} }`)

      setupNewActiveUser(
        roomId,
        access_token,
        refresh_token,
        new Date(new Date().getTime() + expires_in * 1000),
      )

      logger.info('sending init user')

      const {
        spotifyId,
        hostImage,
        hostName,
      } = await initUser(access_token, logger)

      stopUserAuthCycle(roomId)

      logger.info('creating playlist')

      const playlistId = await createPlaylist(roomId, access_token, spotifyId, logger)

      logger.info(`creating and saving a new Session doc with roomId ${roomId}`)

      await new Session({
        roomId,
        token: access_token,
        refreshToken: refresh_token,
        expiresIn: new Date(new Date().getTime() + expires_in * 1000),
        spotifyId,
        playlistId,
        hostName,
        hostImage,
        isAlive: true,
      }).save()

      logger.info('finished auth cycle redirecting back to client')

      return res.redirect(`${clientCallback}?success=true&roomId=${roomId}`)
    }
    logger.warn(`Got a state missmatch in callback route stopping user with id ${roomId} auth cycle`)

    return res.redirect(`${clientCallback}?success=false&reason=client-state-missmatch`)
  } catch (e) {
    logger.warn(`Got an error in callback route stopping user with id ${roomId} auth cycle`)
    logger.warn(e)

    stopUserAuthCycle(roomId)

    return res.redirect(`${clientCallback}?success=false&reason=login-auth-callback-fail`)
  }
}
