const {
  SPOTIFY_ACCOUNTS_API,
  CLIENT_ID,
} = require('../consts')

module.exports = ({ scopes, apiCallback }) => (
  req,
  res,
) => {
  const { state, logger } = req

  logger.info(`got login request redirecting to spotify authorize with clientId: ${CLIENT_ID}, scopes: ${scopes}, apiCallback: ${apiCallback}, state: ${state}`)

  res.redirect(
    `${SPOTIFY_ACCOUNTS_API}/authorize?response_type=code&client_id=${CLIENT_ID}${
      scopes
        ? `&scope=${encodeURIComponent(scopes.join(' '))}`
        : ''
    }&redirect_uri=${encodeURIComponent(apiCallback)}&state=${state}`,
  )
}
