import users from '../users/user.controller.js'
import jobs from './job.controller.js';
import { Router } from "express";

const router = Router();

router.post('/', users.verifyToken, users.hasAuthorization(['admin', 'employer']), jobs.create)


export default router