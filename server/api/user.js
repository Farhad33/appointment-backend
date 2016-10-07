import express from 'express'
import {queries, commands} from '../database'

const router = new express.Router()

router.get('/', (request, response, next) => {
  response.send("home Page")
})

router.get('/freeSlots/:serviceId', (request, response, next) => {
  const serviceId = request.params.serviceId
  queries.getFreeSlotsByServiceId(serviceId)
    .then(freeSlots => {
      response.json(freeSlots)
    })
})

router.get('/services', (request, response, next) => {
  queries.getAllServices()
    .then( services => {
      response.json(services)
    })
})

router.get('/user', (request, response, next) => {
  queries.getUsers()
    .then(user => {
      response.json(user)
    })
})

router.post('/user', (request, response, next) => {
  const att = request.body
  commands.createUser(att)
    .then(user => {
      response.json(user)
    })
})

router.get('/user/:id', (request, response, next) => {
  const userId = request.params.id
  queries.getUserById(userId)
    .then(user => {
      if (user){
        response.json(user)
      }else{
        response.status(404).json(null)
      }
    })
})


export default router


