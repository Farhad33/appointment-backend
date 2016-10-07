const moment = require('moment')
const tz = require('moment-timezone')

export default (knex) => ({

  getUsers() {
    return knex
      .table('users')
      .select('*')
  },

  getUserById(userId) {
    return knex
      .table('users')
      .where('id', userId)
      .first('*')
  },

  getAllServices() {
    return knex
      .table('services')
      .select('*')
  },

  getFreeSlotsByServiceId(serviceId) {
    return Promise.all([
      knex 
      .from('agents')
      .join('agent_services', {'agent_services.agent_id': 'agents.id'}) 
      .where('agent_services.service_id', serviceId)
    ])
    .then(agents => {
      console.log("agents", agents)
      return generateFreeSlots(agents)
    })


  },

  getAgents() {
    return knex
      .table('agents')
      .select('*')
  },

  getAgentServices() {
    return knex
      .table('agent_services')
      .select('*')
  }


})


const generateFreeSlots = (agents) => {
  var week = { monday: [], 
              tuesday: [], 
            wednesday: [], 
             thursday: [], 
               friday: [], 
             saturday: [], 
               sunday: []
            }
  for(let agent of agents[0]){
    let days = JSON.parse(agent.availability)
    days.map(day => {
      let start = parseInt(day.hours[0].start.slice(0, 2))
      let end = parseInt(day.hours[0].end.slice(0, 2))
      while(start < end){
        let temp = day.day
        week[temp].push([start, start+1])
        start++
      }
    })
  }
  return week
}
     


    // let current = moment()
    // console.log(current.tz("America/Los_Angeles").format('YYYY-MM-DDTHH:mm'))













