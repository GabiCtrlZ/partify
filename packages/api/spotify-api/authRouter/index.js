const express = require('express')

const login = require('./login')
const callback = require('./callback')

const { checkForAuthError, startUserAuthCycle } = require('../middlewares')

module.exports = (creds) => {
  const router = express.Router()

  router.get('/login', [startUserAuthCycle(creds)], login(creds))

  router.get('/callback', [checkForAuthError(creds)], callback(creds))

  return router
}
