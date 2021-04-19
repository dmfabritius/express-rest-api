import path from 'path';
import knex from 'knex';
import express from 'express';

export const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, '../../db/auth.sqlite'),
  },
  useNullAsDefault: true,
});

export interface User {
  user_id: number;
  email: string;
  name: string;
  hash: string;
  created_at: string;
  updated_at: string;
}

export interface House {
  house_id: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
}

export interface Request extends express.Request {
  user?: User;
  house?: House;
}
