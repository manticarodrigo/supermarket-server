const config = {}

config.redisStore = {
  url: process.env.REDIS_STORE_URI,
  secret: process.env.REDIS_STORE_SECRET
}

config.mongoDB = {
  host: 'mongodb://127.0.0.1:27017/edumate'
}

module.exports = config;