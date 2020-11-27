const spotifyApi = require('./spotify-api')

module.exports = spotifyApi({
  clientCallback: 'http://localhost:3000',
  apiCallback: 'http://localhost:3007/api/v1/auth/callback',
})
