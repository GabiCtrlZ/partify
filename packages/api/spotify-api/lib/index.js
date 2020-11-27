const refactorSongsRes = require('./refactorSongsRes')
const refactorSearchRes = require('./refactorSearchRes')
const refreshAuthToken = require('./refreshAuthToken')
const { bearer, basic } = require('./getAuthHeader')

module.exports = {
  refactorSongsRes,
  refactorSearchRes,
  refreshAuthToken,
  bearer,
  basic,
}
