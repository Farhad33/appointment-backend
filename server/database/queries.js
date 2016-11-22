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

  getAgents() {
    return knex
      .table('agents')
      .select('*')
  },

  getAgentServices() {
    return knex
      .table('agent_services')
      .select('*')
  },

  getFreeSlotsByServiceId(serviceId, date) {
    return Promise.all([
      knex
      .from('agents')
      .join('agent_services', {'agent_services.agent_id': 'agents.id'})
      .where('agent_services.service_id', serviceId)
    ])
    .then(agents => {
      let Date = currentDate(date)
      return generateFreeSlots(agents, Date)
    })

  },

})

const currentDate = (date) => {
  if (date) {
    let time = "08:00"
    return moment( `${date} ${time}` ).format(  "YYYY-MM-DDTHH:mm:ss" )
  }else {
    return moment().format("YYYY-MM-DDTHH:mm:ss")
  }
}

const generateFreeSlots = (agents, date) => {
  var week = []
  for(let agent of agents[0]){
    let days = JSON.parse(agent.availability)
    days.map(day => {
      // console.log("day +++ ", day.day);
      var dayOfWeek = moment(date).format('dddd')
      if (day.day === dayOfWeek) {
        
      }
      // let start = parseInt(day.hours[0].start.slice(0, 2))
      // let end = parseInt(day.hours[0].end.slice(0, 2))
      // while(start < end){
      //   let temp = day.day
      //
      //   week[temp].push({start})
      //   start++
      // }
    })
  }
  let x = "2016-10-05"
  let y = "09:00"

  let dateTime = moment( `${x} ${y}` ).format(  "YYYY-MM-DDTHH:mm:ss" )

  // console.log( 'Date Time', dateTime );
  return week
}


    // let current = moment()
    // console.log(current.tz("America/Los_Angeles").format('YYYY-MM-DDTHH:mm'))
