const { model, Schema } = require('mongoose')

const sessionSchema = new Schema({
  room: String,
  isAlive: Boolean,
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '7 days' },
  },
}, { timestamps: true })

module.exports = model('sessions', sessionSchema)
