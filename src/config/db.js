import mongoose from 'mongoose'
import config from './config.js'
import logger from './logger.js'

async function connect() {
  try {
    await mongoose.connect(config.mongoose.url, config.mongoose.options)
    logger.info('Connect to Mongodb Successfully')
  } catch (error) {
    console.log(error)
    throw new Error('Fail to Connect Mongodb')
  }
}

export default { connect }
import('./all.model.js')
