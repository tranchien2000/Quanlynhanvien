import students from './students.controller.js';
import { Router } from "express";

const router = Router();

router.get('/', students.list)
router.get('/:id', students.read)
router.post('/', students.create)
router.put('/:id', students.update)
router.delete('/:id', students.delete)
router.param('id', students.studentById)

export default router