import users from './user.controller.js'
import { Router } from "express";

const router = Router();

router.post('/auth/signup', users.checkDuplicateUsernameOrEmail, users.signup)
router.post('/auth/signin', users.signin)

export default router