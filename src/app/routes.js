import { Router as ExpressRouter } from 'express'
import employeeRoutes from './employees/employees.routes.js'
const Router = ExpressRouter()

Router.use('/employees', employeeRoutes)

export default Router