const express = require('express')

const router = express.Router()

const {
  isLoggedIn,
  isAdmin,
  getSession,
  validateToken,
} = require('../../auth')

const remove = require('./remove')
const add = require('./add')
const search = require('./search')

router.post('/add', [isLoggedIn, getSession, validateToken], add)
router.post('/remove', [isLoggedIn, isAdmin, getSession, validateToken], remove)
router.post('/search', [isLoggedIn, getSession, validateToken], search)

module.exports = router
