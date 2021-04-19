import { Response } from 'express';
import bcrypt from 'bcrypt';
import * as yup from 'yup';
import { db, Request, User } from '../model/db';
import { generateToken } from '../utils';

const RegistrationValidation = yup.object().shape({
  confirm: yup
    .string()
    .required()
    .oneOf([yup.ref('password')]),
  email: yup.string().email().required().min(6).max(128),
  name: yup.string().required(),
  password: yup.string().required().min(4),
});

export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    if (!(await RegistrationValidation.isValid(req.body))) return res.sendStatus(400);
    const { email, password, name } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user_id = (await db('users').insert({ email, hash, name }))[0];
    const user = await db<User>('users').first('*').where({ user_id });
    const accessToken = generateToken(user.email);
    return res.status(200).json({ accessToken });
  } catch (err) {
    console.error(err);
    if (err.code === 'SQLITE_CONSTRAINT') return res.sendStatus(409); // duplicate email address
    return res.sendStatus(500);
  }
};

const LoginValidation = yup.object().shape({
  email: yup.string().email().required().min(6).max(128),
  password: yup.string().required().min(4),
});

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    if (!(await LoginValidation.isValid(req.body))) return res.sendStatus(400);

    const { email, password } = req.body;
    const user = await db<User>('users').first('*').where({ email });
    if (!user || !(await bcrypt.compare(password, user.hash))) return res.sendStatus(403);

    const accessToken = generateToken(user.email);
    return res.status(200).json({ accessToken });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};
