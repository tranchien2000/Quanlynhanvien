import { Router as ExpressRouter } from 'express'
import userRoutes from './users/user.routes.js'
const Router = ExpressRouter()

Router.use('/user', userRoutes)

export default Router