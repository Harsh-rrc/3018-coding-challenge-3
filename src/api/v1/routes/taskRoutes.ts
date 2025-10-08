import { Router } from 'express';
import { createTask } from '../controllers/taskController';
import { validateBody } from '../middleware/validationMiddleware';
import { createTaskSchema } from '../validations/taskValidations';

const router = Router();

// First validate the data, then create the task
router.post('/', validateBody(createTaskSchema), createTask);

export default router;