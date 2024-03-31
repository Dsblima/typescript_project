import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/usecases/createRental/CreateRentalController';

import { ensureAuthenticated } from '../middlewares/ensureAthenticated';

const rentalsRoutes = Router();
const createRentalController = new CreateRentalController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle);

export { rentalsRoutes };
