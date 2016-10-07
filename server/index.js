import '../../config/environment'
import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import errorHandlers from './error_handlers'

import apiRoutes from './api'

const appRoot = process.env.APP_ROOT
const buildPath = process.env.BUILD_PATH
const server = express()

module.exports = server

server.set('env', process.env.NODE_ENV)
server.set('port', process.env.PORT || '4000')
if (process.env.NODE_ENV !== 'test') server.use(logger('dev'))
server.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_KEY]
}))
server.use(express.static(buildPath+'/public'))
server.use(bodyParser.json())

server.use('/', apiRoutes)

server.use(errorHandlers)

if (process.env.NODE_ENV !== 'test'){
  server.listen(server.get('port'))
}
