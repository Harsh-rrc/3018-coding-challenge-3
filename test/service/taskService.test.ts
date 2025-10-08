import { TaskService } from '../../src/api/v1/services/taskService';
import { createDocument } from '../../src/api/v1/repositories/firestoreRepository';

// Mock the database so we don't hit real Firestore
jest.mock('../../src/repository/firestoreRepository');

describe('TaskService', () => {
    let taskService: TaskService;

    beforeEach(() => {
        taskService = new TaskService();
        jest.clearAllMocks();
    });

    // Test suite for createTask method
    describe('createTask', () => {
        it('should create a task successfully', async () => {
            // Test data
            const taskData = {
                userId: 'user123',
                title: 'Test Task',
                priority: 'medium' as const,
                status: 'open' as const,
                dueDate: new Date('2024-12-31')
            };

            // Mock database response
            const mockCreatedTask = {
                id: 'task123',
                ...taskData,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            (createDocument as jest.Mock).mockResolvedValue(mockCreatedTask);

            // Call the service
            const result = await taskService.createTask(taskData);

            // Check results
            expect(createDocument).toHaveBeenCalledWith('tasks', expect.any(Object));
            expect(result).toEqual(mockCreatedTask);
        });

        it('should throw error when database fails', async () => {
            const taskData = {
                userId: 'user123',
                title: 'Test Task',
                priority: 'medium' as const,
                status: 'open' as const,
                dueDate: new Date('2024-12-31')
            };

            // Mock database failure
            (createDocument as jest.Mock).mockRejectedValue(new Error('DB error'));

            // Should throw error
            await expect(taskService.createTask(taskData)).rejects.toThrow('Failed to create task');
        });
    });
});