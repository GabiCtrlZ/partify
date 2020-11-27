/* eslint-disable no-underscore-dangle */
class Credentials {
  constructor(scopes, apiCallback, clientCallback) {
    this._scopes = scopes || []
    this._apiCallback = apiCallback || '/callback'
    this._clientCallback = clientCallback || '/'
    this._usersInAuthCycle = {}
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
}

module.exports = Credentials
