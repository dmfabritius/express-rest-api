import { Response } from 'express';
import { db, Request, User } from '../model/db';

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    //const users = await db<User>('users').select('*');
    const users = await db<User>('users').select(['user_id', 'email', 'name']);
    return res.json(users);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

export const getUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await db<User>('users').first(['email', 'name']).where({ email: req.user?.email });
    const { email, name } = user as User;
    return res.json({ email, name });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};
