import express from 'express'
import usersRoutes from './user'

const router = new express.Router()

router.use('/',  usersRoutes)

export default router
