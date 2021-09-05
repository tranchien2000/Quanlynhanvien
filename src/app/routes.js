import { Router as ExpressRouter } from 'express'
import userRoutes from './users/user.routes.js'
import jobRoutes from './jobs/job.routes.js'
const Router = ExpressRouter()

Router.use('/user', userRoutes)
Router.use('/job', jobRoutes)

export default Router