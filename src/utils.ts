import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_TIMEOUT } from './config';

export const getTimeStamp = (): string => {
  const matches = new Date().toString().match(/([-+][0-9]+)\s/);
  const tz = matches ? matches[1] : '';
  const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  return new Date(Date.now() - tzoffset).toISOString().slice(0, -1).replace('T', ' ') + tz;
};

export const generateToken = (email: string): string => {
  return jwt.sign({ email }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_TIMEOUT });
};
