import { Router } from 'express';
import { register, login } from '../controllers/authentication';

export const authRoutes = Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
