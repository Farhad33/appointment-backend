export default (knex, queries) => ({

  createUser(attributes) {
    return knex
      .table('users')
      .insert(attributes)
      .returning('*')
      .then(firstRecord)
  },

  updateUser(userId, attributes) {
    return knex
      .table('users')
      .where('id', userId)
      .update(attributes)
      .returning('*')
      .then(firstRecord)

  },

  createService(attributes) {
    return knex
      .table('services')
      .insert(attributes)
      .returning('*')
      .then(firstRecord)
  },


  createAgent(attributes, availability, services) {
    attributes.availability = JSON.stringify(availability)
    return Promise.all([
      knex.table('agents')
          .insert( attributes )
          .returning('id')
      ])
    .then( agentId => {
      const agent_id = agentId[0][0]

      const inserts = services.map( service_id => {
        return knex.table('agent_services')
          .insert({agent_id, service_id })
      })

      return Promise.all( inserts )
    })
  },

  createAgentService(agentId, serviceId) {
    return knex
      .table('agent_services')
      .insert({agent_id: agentId, service_id: serviceId})
      .returning('*')
  }


})

const firstRecord = records => records[0];
