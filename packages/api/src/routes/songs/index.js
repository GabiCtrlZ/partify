const express = require('express')

const router = express.Router()

const {
  isLoggedIn,
  isAdmin,
} = require('../../auth')

const remove = require('./remove')

router.post('/close', [isLoggedIn, isAdmin], remove)

module.exports = router
