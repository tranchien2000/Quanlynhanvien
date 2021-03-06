import employee from './employees.controller.js';
import { Router } from "express";

const router = Router();

router.get('/', employee.list)
router.post('/come', employee.come)
router.get('/:id', employee.read)
router.post('/', employee.create)
router.put('/:id', employee.update)
router.delete('/:id', employee.delete)
router.get('/:id/salary', employee.salary)
router.param('id', employee.employeeById)

export default router