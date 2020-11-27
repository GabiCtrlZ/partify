const jwt = require('jsonwebtoken')

const {
  SECRET,
} = require('../consts')

const sign = (payload) => {
  const signOptions = {
    expiresIn: '8d',
  }

  return jwt.sign(payload, SECRET, signOptions)
}

const verify = (token) => {
  try {
    return jwt.verify(token, SECRET)
  } catch (err) {
    return false
  }
}

module.exports = {
  sign,
  verify,
}
