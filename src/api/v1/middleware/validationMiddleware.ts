import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { HTTP_STATUS } from '../../constants/httpConstants';

// This middleware checks if incoming data matches our rules
export const validateBody = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        
        if (error) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                error: error.details[0].message
            });
        }
        
        next();
    };
};