import glob from 'glob'
import path from 'path'
import fs from 'fs'
import logger from '../src/config/logger.js'

const files = glob.sync('src/app/*/*.model*.js')
let outputContent = ``
logger.info('Start generate model files...')
files.forEach(function (routePath) {
  const relativePath = path.relative('src/config', routePath)
  logger.info(`Importing Model from ${relativePath}`)
  outputContent += `import('${relativePath}')\n`.replace(/\\/g, '/')
})
logger.info('Finish generate model files...')

fs.writeFileSync('src/config/all.model.js', outputContent)
