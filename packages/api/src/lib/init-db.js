const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const {
  MONGO_URI,
  MONGO_OPTIONS,
} = require('../consts')

const init = async (errorHandler = null, bufferCommands = false) => {
  mongoose.set('bufferCommands', bufferCommands)
  mongoose.set('useFindAndModify', false)

  try {
    mongoose.connection.on('error', (err = null) => {
      if (errorHandler && typeof errorHandler === 'function') {
        errorHandler(err)
      } else {
        console.error(err)
      }
    })

    await mongoose.connect(process.env.MONGODB_URI || MONGO_URI, MONGO_OPTIONS)

    console.log('connected successfully to the mongodb database')
    return mongoose
  } catch (e) {
    throw new Error(e)
  }
}

module.exports = init
