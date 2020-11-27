require('dotenv').config()

const packagejson = require('../package.json')

const {
  PORT,
  LOCAL_DEV,
  MONGO_HOST,
  MONGO_DBNAME,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_AUTHSOURCE,
  MONGO_POOL_SIZE = 100,
  SECRET = 'defaultSecret',
  DISABLE_COOKIE_SECURITY = false,
  CLIENT_BUILD_PATH,
  API_CALLBACK,
  CLIENT_CALLBACK,
} = process.env

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  poolSize: +MONGO_POOL_SIZE,
  useUnifiedTopology: true,
}

const MONGO_AUTH_OPTIONS = (() => {
  const options = {
    auth: {
      user: MONGO_USER,
      password: MONGO_PASSWORD,
    },
  }

  if (MONGO_AUTHSOURCE) {
    options.authSource = MONGO_AUTHSOURCE
  }

  return options
})()

const MONGO_URI = (() => {
  const URI = `mongodb://${MONGO_HOST}/${MONGO_DBNAME}`

  return URI
})()

const COOKIE_NAME = process.env.COOKIE_NAME || 'default-App'

const COOKIE_OPTIONS = {
  maxAge: 30 * 24 * 60 * 60 * 1000,
  httpOnly: false,
}

module.exports = {
  PORT,
  COOKIE_NAME,
  COOKIE_OPTIONS,
  LOCAL_DEV,
  DISABLE_COOKIE_SECURITY,
  SECRET,
  CLIENT_BUILD_PATH,
  MONGO_URI,
  MONGO_OPTIONS: {
    ...MONGO_OPTIONS,
    ...MONGO_AUTH_OPTIONS,
  },
  SERVICE_NAME: `${packagejson.name}:${packagejson.version}`,
  API_CALLBACK,
  CLIENT_CALLBACK,
}
