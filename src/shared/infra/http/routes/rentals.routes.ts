import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/usecases/createRental/CreateRentalController';
import { ReturnCarController } from '@modules/rentals/usecases/returnCar/ReturnCarController';

import { ensureAuthenticated } from '../middlewares/ensureAthenticated';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const returnCarController = new ReturnCarController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalsRoutes.post(
    '/devolution:id',
    ensureAuthenticated,
    returnCarController.handle
);

export { rentalsRoutes };
