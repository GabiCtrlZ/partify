const Credentials = require('./Credentials')
const authRouter = require('./authRouter')
const spotifyActions = require('./actions')

module.exports = (config) => {
  const {
    clientCallback = '/',
    apiCallback = '/callback',
    scopes = [
      'playlist-modify-public',
      'playlist-modify-private',
      'user-read-email',
      'user-read-private',
      'user-read-currently-playing',
      'user-read-playback-state',
      'user-modify-playback-state',
    ],
  } = config

  const creds = new Credentials(
    scopes,
    apiCallback,
    clientCallback,
  )

  return {
    authRouter: authRouter(creds),
    creds,
    spotifyActions,
  }
}
