/* eslint-disable camelcase */
const axios = require('axios').default
const { SPOTIFY_ACCOUNTS_API } = require('../consts')
const { basic } = require('../lib/getAuthHeader')

module.exports = ({
  apiCallback: redirect_uri,
  clientCallback,
  setupNewActiveUser,
  isIdInAuthCycle,
  stopUserAuthCycle,
}) => async (req, res) => {
  const { query, logger } = req
  logger.info(`Got success on callback with query ${query}`)
  const { code, state } = query

  try {
    if (isIdInAuthCycle(state)) {
      logger.info(`${state} is in auth cycle sending code to spotify api token`)

      const { data } = await axios({
        url: `${SPOTIFY_ACCOUNTS_API}/api/token`,
        method: 'POST',
        headers: basic,
        data: {
          grant_type: 'authorization_code',
          code,
          redirect_uri,
        },
      })

      logger.info(`Got success response from spotify api token with response ${data}`)

      const {
        access_token,
        refresh_token,
        expires_in,
      } = data

      setupNewActiveUser(
        state,
        access_token,
        refresh_token,
        new Date(new Date().getTime() + expires_in * 1000),
      )

      stopUserAuthCycle(state)

      return res.redirect(`${clientCallback}?success=true&userId=${state}`)
    }
    logger.warn(`Got a state missmatch in callback route stopping user with id ${state} auth cycle`)

    return res.redirect(`${clientCallback}?success=false&reason=client-state-missmatch`)
  } catch (e) {
    logger.warn(`Got an error in callback route stopping user with id ${state} auth cycle`)

    stopUserAuthCycle(state)

    return res.redirect(`${clientCallback}?success=false&reason=login-auth-callback-fail`)
  }
}
