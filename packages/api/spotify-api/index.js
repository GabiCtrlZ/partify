const Credentials = require('./Credentials')
const authRouter = require('./authRouter')

module.exports = function Spotify(config) {
  const {
    apiCallback = '/callback',
    clientCallback = '/',
    scopes = [
      'playlist-modify-public',
      'playlist-modify-private',
      'user-read-email',
      'user-read-private',
    ],
  } = config

  const creds = new Credentials(
    scopes,
    apiCallback,
    clientCallback,
  )

  return {
    authRouter: authRouter(creds),
  }
}
