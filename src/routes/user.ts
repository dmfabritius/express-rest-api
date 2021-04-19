import { Router } from 'express';
import { getUsers, getUser } from '../controllers/user';
import { authenticateToken } from '../middleware/authenticateToken';

export const userRoutes = Router();

userRoutes.get('/all', getUsers); // an example of a non-secure route
userRoutes.get('/', authenticateToken, getUser); // an example of a secure route
