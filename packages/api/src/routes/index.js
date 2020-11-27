const express = require('express')

const session = require('./session')
const songs = require('./songs')
const { authRouter } = require('../../initSpotifyApi')

const router = express.Router()

router.use('/session', [], session)
router.use('/songs', [], songs)
router.use('/auth', [], authRouter)

module.exports = router
