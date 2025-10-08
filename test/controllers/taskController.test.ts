import { Request, Response, NextFunction } from 'express';
import { createTask } from '../../src/api/v1/controllers/taskController';
import { TaskService } from '../../src/api/v1/services/taskService';

// Mock the service
jest.mock('../../src/api/v1/services/taskService');

// Mock Express objects
const mockRequest = (body: any = {}) => ({ body });
const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};
const mockNext = () => jest.fn();

describe('TaskController', () => {
    let mockTaskService: jest.Mocked<TaskService>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockTaskService = {
            createTask: jest.fn()
        } as any;
        (TaskService as jest.Mock).mockImplementation(() => mockTaskService);
    });

    describe('createTask', () => {
        it('should return 201 when task is created', async () => {
            const taskData = {
                userId: 'user123',
                title: 'Test Task',
                priority: 'medium',
                status: 'open',
                dueDate: new Date('2024-12-31')
            };

            const mockTask = { id: 'task123', ...taskData };
            const req = mockRequest(taskData) as Request;
            const res = mockResponse() as Response;
            const next = mockNext();

            mockTaskService.createTask.mockResolvedValue(mockTask);

            await createTask(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Task created successfully',
                task: mockTask
            });
        });
    });
});