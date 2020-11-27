/* eslint-disable no-underscore-dangle */
class Credentials {
  constructor(scopes, apiCallback, clientCallback) {
    this._scopes = scopes || []
    this._apiCallback = apiCallback || '/callback'
    this._clientCallback = clientCallback || '/'
    this._usersInAuthCycle = {}
    this._activeUsers = {}
  }

  get scopes() {
    return this._scopes
  }

  get apiCallback() {
    return this._apiCallback
  }

  get clientCallback() {
    return this._clientCallback
  }

  get activeUsers() {
    return this._activeUsers
  }

  get usersInAuthCycle() {
    return this._usersInAuthCycle
  }

  startUserAuthCycle = (id) => {
    this._usersInAuthCycle[id] = true
  }

  stopUserAuthCycle = (id) => {
    delete this._usersInAuthCycle[id]
  }

  isIdInAuthCycle = (id) => {
    return this._usersInAuthCycle[id]
  }

  setupNewActiveUser = (
    id,
    token,
    refreshToken,
    expiresIn
  ) => {
    this._activeUsers[id] = {
      token,
      refreshToken,
      expiresIn,
    }
  }

  initActiveUser = (id, spotifyId, name, image) => {
    this._activeUsers[id] = {
      ...this._activeUsers[id],
      spotifyId,
      name,
      image,
    }
  }

  setKeyInActiveUser = (id, key, value) => {
    this._activeUsers[id][key] = value
  }
}

module.exports = Credentials
