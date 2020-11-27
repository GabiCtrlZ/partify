const express = require('express')

const session = require('./session')
const songs = require('./songs')

const router = express.Router()

router.use('/session', [], session)
router.use('/songs', [], songs)

module.exports = router
