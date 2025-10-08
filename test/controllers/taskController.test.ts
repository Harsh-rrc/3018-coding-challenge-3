import { Request, Response, NextFunction } from 'express';
import { createTask } from '../../src/api/v1/controllers/taskController';
import { TaskService } from '../../src/api/v1/services/taskService';
import { Task } from '../../src/api/v1/models/taskModel';

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


// Test suite for TaskController
describe('TaskController', () => {
    let mockTaskService: jest.Mocked<TaskService>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockTaskService = {
            createTask: jest.fn()
        } as any;
        (TaskService as jest.Mock).mockImplementation(() => mockTaskService);
    });

    // Test for createTask controller
    describe('createTask', () => {
        it('should return 201 when task is created', async () => {
            const taskData = {
                userId: 'user123',
                title: 'Test Task',
                priority: 'medium' as const,
                status: 'open' as const,
                dueDate: new Date('2024-12-31')
            };

            const mockTask: Task = {
                id: 'task123',
                ...taskData,
                createdAt: new Date(),
                updatedAt: new Date()
            };

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