const express = require('express')

const router = express.Router()

const {
  isLoggedIn,
  cookie,
  create,
  join,
  isAdmin,
} = require('../../auth')

const getAll = require('./get-all')
const close = require('./close')

router.post('/create', [create, cookie], getAll)
router.post('/join', [join, cookie], getAll)
router.post('/get-all', [isLoggedIn], getAll)
router.post('/close', [isLoggedIn, isAdmin], close)

module.exports = router
