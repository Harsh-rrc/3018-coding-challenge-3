import { Router } from 'express';
import { createTask } from '../controllers/taskController';
import { validateBody } from '../middlewares/validationMiddleware';
import { createTaskSchema } from '../validations/taskValidation';

const router = Router();

// POST /api/v1/tasks - Create a new task
// First validate the data, then create the task
router.post('/', validateBody(createTaskSchema), createTask);

export default router;