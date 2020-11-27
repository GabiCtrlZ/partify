const { model, Schema } = require('mongoose')

const sessionSchema = new Schema({
  roomId: String,
  token: String,
  refreshToken: String,
  expiresIn: Date,
  spotifyId: String,
  playlistId: String,
  hostName: String,
  hostImage: String,
  isAlive: Boolean,
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '7 days' },
  },
}, { timestamps: true })

module.exports = model('sessions', sessionSchema)
