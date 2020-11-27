const express = require('express')

const session = require('./session')
const songs = require('./songs')
const { authRouter } = require('../lib/init-spotify-api')

const router = express.Router()

router.use('/session', [], session)
router.use('/songs', [], songs)
router.use('/auth', [], authRouter)

module.exports = router
