import dotenv from 'dotenv';

dotenv.config(); // load environment variables from .env file
export const PORT = process.env.PORT || 3000;
export const SECURE_PORT = process.env.SECURE_PORT || 3001;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'secret';
export const ACCESS_TOKEN_TIMEOUT = process.env.ACCESS_TOKEN_TIMEOUT || '4h';
