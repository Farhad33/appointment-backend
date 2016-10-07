import Knex from 'knex'
import queriesFactory from './queries'
import commandsFactory from './commands'

// paths are relative to build/server/database/index.js
require('../../../config/environment')
const config = require('../../../knexfile')[process.env.NODE_ENV]
const knex = Knex(config)
const queries = queriesFactory(knex)
const commands = commandsFactory(knex, queries)

knex.truncateAllTables = function(){
  return Promise.all([
    this.truncate('users'),
    this.truncate('services'),
    this.truncate('agents'),
    this.truncate('agent_services'),
    this.truncate('appointments')
  ])
}

export { knex, queries, commands }
