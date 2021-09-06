import users from '../users/user.controller.js'
import jobs from './job.controller.js';
import { Router } from "express";

const router = Router();

router.post('/', users.verifyToken, users.hasAuthorization(['admin', 'employer']), jobs.create)
router.get('/', users.verifyToken, jobs.list)
router.post('/find',users.verifyToken, jobs.find)
router.post('/:jobId', users.verifyToken, users.hasAuthorization(['admin', 'user']), jobs.apply)
router.param('jobId', jobs.jobById)


export default router