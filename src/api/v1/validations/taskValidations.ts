import Joi from 'joi';

// These rules validate the data before it hits our database
export const createTaskSchema = Joi.object({
    userId: Joi.string().required().messages({
        'string.empty': 'User ID is required',
        'any.required': 'User ID is required'
    }),
    
    // Title must be a non-empty string up to 255 characters
    title: Joi.string().min(1).max(255).required().messages({
        'string.empty': 'Title is required',
        'string.max': 'Title must be less than 255 characters'
    }),
    
    // Priority can only be low, medium, or high
    priority: Joi.string().valid('low', 'medium', 'high').required().messages({
        'any.only': 'Priority must be low, medium, or high'
    }),
    
    // Status can only be open, in-progress, or completed
    status: Joi.string().valid('open', 'in-progress', 'completed').required().messages({
        'any.only': 'Status must be open, in-progress, or completed'
    }),
    
    
    dueDate: Joi.date().greater('now').required().messages({
        'date.greater': 'Due date must be in the future'
    })
});