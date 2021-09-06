import users from '../users/user.controller.js'
import careers from './career.controller.js';
import { Router } from "express";

const router = Router();

router.get('/', careers.list)


export default router