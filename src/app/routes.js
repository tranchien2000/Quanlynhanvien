import { Router as ExpressRouter } from 'express'
import userRoutes from './users/user.routes.js'
import jobRoutes from './jobs/job.routes.js'
import careerRoutes from './career/career.routes.js'
const Router = ExpressRouter()

Router.use('/career', careerRoutes)
Router.use('/user', userRoutes)
Router.use('/job', jobRoutes)

export default Router