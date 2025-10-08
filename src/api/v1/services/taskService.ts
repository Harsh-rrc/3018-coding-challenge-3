import { Task } from '../models/taskModel';
import { createDocument } from '../../../repository/firestoreRepository';

export class TaskService {
    async createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
        try {
            console.log('Creating task with data:', taskData);
            
            // Add timestamps - when task was created/updated
            const taskWithTimestamps = {
                ...taskData,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            
            // Save to Firestore database
            const createdTask = await createDocument<Task>('tasks', taskWithTimestamps);
            
            console.log('Task created successfully:', createdTask);
            return createdTask;
        } catch (error) {
            console.error('Error creating task in service:', error);
            throw new Error('Failed to create task');
        }
    }
}