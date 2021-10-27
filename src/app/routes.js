import { Router as ExpressRouter } from 'express'
import userRoutes from './users/user.routes.js'
import jobRoutes from './jobs/job.routes.js'
import careerRoutes from './career/career.routes.js'
import studentRoutes from './students/students.routes.js'
const Router = ExpressRouter()

Router.use('/career', careerRoutes)
Router.use('/user', userRoutes)
Router.use('/job', jobRoutes)
Router.use('/student', studentRoutes)

export default Router