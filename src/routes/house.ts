import { Router } from 'express';
import { getHouses, getHouse, putHouse, deleteHouse } from '../controllers/house';
import { authenticateToken } from '../middleware/authenticateToken';

export const houseRoutes = Router();

// houseRoutes.get('/', authenticateToken, getHouses); // secure route
houseRoutes.route('/').get(getHouses);
houseRoutes
  .route('/:id')
  .get(authenticateToken, getHouse)
  .put(authenticateToken, putHouse)
  .delete(authenticateToken, deleteHouse);
