const express = require('express')

const router = express.Router()

const {
  isLoggedIn,
  cookie,
  create,
  join,
  isAdmin,
  getSession,
  validateToken,
} = require('../../auth')

const getAll = require('./get-all')
const close = require('./close')

router.post('/create', [create, cookie, getSession, validateToken], getAll)
router.post('/join', [join, cookie, getSession, validateToken], getAll)
router.post('/get-all', [isLoggedIn, getSession, validateToken], getAll)
router.post('/close', [isLoggedIn, isAdmin, getSession, validateToken], close)

module.exports = router
