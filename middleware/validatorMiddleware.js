
import { body } from 'express-validator';

const loginValidate = [
    body('username')
        .trim().notEmpty().withMessage('User name is required').isLength({ min: 3, max: 20 }).withMessage('user name min 3 character and max 20'),
    body('password').trim().notEmpty().withMessage('Password field is required').isLength({ min: 6, max: 12 }).withMessage("password min 6 and max 12 character")
]

const categoryValidate = [
    body('name').trim().notEmpty().withMessage('Category name is required').isLength({ min: 3 }).withMessage('category min 5 characters'),
    body('description').trim().notEmpty().withMessage('Description is required').isLength({ min: 3 }).withMessage('Description min 20 character'),
]

const articleValidate = [
    body('title').trim().notEmpty().withMessage('Article is required').isLength({ min: 3 }).withMessage('Article min 3 characters'),
    body('content').trim().notEmpty().withMessage('content is required').isLength({ min: 3 }).withMessage('Description min 3 characters'),
]

export {
    loginValidate, categoryValidate, articleValidate
}