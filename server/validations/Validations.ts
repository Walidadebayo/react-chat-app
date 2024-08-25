import { checkForValidationError } from '../src/middlewares/CheckForValidationError';
import { body } from 'express-validator';
import { User } from '../src/models/UserModel';

export const userValidation = [
    body('name').notEmpty().withMessage('Name is required').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('username').notEmpty().withMessage('User is required').isLength({ min: 3 }).withMessage('User must be at least 3 characters long').custom(async (value) => {
        const user = await User.findOne({ username: value });
        if (user) {
            throw new Error('User already exists');
        }
        return true;
    }),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is invalid').custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
            throw new Error('Email already exists');
        }
        return true;
    }),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    checkForValidationError
];

export const loginValidation = [
    body('username-email').notEmpty().withMessage('User is required'),
    body('password').notEmpty().withMessage('Password is required'),
    checkForValidationError
];