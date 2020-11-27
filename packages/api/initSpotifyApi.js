const spotifyApi = require('./spotify-api')
const { CLIENT_CALLBACK, API_CALLBACK } = require('./src/consts')

module.exports = spotifyApi({
  clientCallback: CLIENT_CALLBACK,
  apiCallback: API_CALLBACK,
})
