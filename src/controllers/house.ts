import { Response } from 'express';
import * as yup from 'yup';
import { db, Request, House } from '../model/db';

export const getHouses = async (req: Request, res: Response): Promise<Response> => {
  try {
    //const houses = await db<house>('houses').select('*');
    const houses = await db<House>('houses').select(['house_id', 'description', 'bedrooms', 'bathrooms']);
    return res.json(houses);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

export const getHouse = async (req: Request, res: Response): Promise<Response> => {
  try {
    const house = await db<House>('houses').first(['*']).where({ house_id: req.params.id });
    return res.json(house);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

const HouseValidation = yup.object().shape({
  bathrooms: yup.number().required().min(1).max(6),
  bedrooms: yup.number().required().min(1).max(6),
  description: yup.string().email().required().min(6).max(128),
});

export const putHouse = async (req: Request, res: Response): Promise<Response> => {
  try {
    // console.log('user info from jwt: ', req.user); //
    const house = req.body as House;
    if (!(await HouseValidation.isValid(house))) return res.sendStatus(400);
    await db<House>('houses').update(house).where({ house_id: req.params.id });
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

export const deleteHouse = async (req: Request, res: Response): Promise<Response> => {
  try {
    await db<House>('houses').delete().where({ house_id: req.params.id });
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};
