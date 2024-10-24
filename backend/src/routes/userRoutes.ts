import express from 'express';
import { getProfile, changeName } from '../controllers/userController';
import { authenticateJWT } from '../middleware/authMiddleware';
import { body } from 'express-validator';

const router = express.Router();

router.get('/profile', authenticateJWT, getProfile);

router.put(
    '/profile/change-name',
    authenticateJWT,
    [body('name').notEmpty().withMessage('Name is required')],
    changeName
);

export default router;
