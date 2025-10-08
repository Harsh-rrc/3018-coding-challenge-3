import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../services/taskService';
import { HTTP_STATUS } from '../constants/httpConstants';

const taskService = new TaskService();

// This handles the HTTP request and response
export const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log('Create task request received:', req.body);
        
        const taskData = req.body;
        
        // Call service to handle business logic
        const newTask = await taskService.createTask(taskData);
        
        console.log('Task created successfully in controller');
        
        // Send success response to client
        res.status(HTTP_STATUS.CREATED).json({
            message: 'Task created successfully',
            task: newTask
        });
    } catch (error) {
        console.error('Error in createTask controller:', error);
        
        // Pass error to Express error handler
        next(error);
    }
};