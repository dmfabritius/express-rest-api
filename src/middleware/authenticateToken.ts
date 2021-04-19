import express, { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../model/db';
import { ACCESS_TOKEN_SECRET } from '../config';

interface Request extends express.Request {
  user?: User;
}

export const authenticateToken = (req: Request, res: Response, next?: NextFunction): Response | void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user as User;
    if (next) next();
  });
};
