import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/usecases/createRental/CreateRentalController';
import { ListRentalByUserController } from '@modules/rentals/usecases/listRentalByUser/ListRentalByUserController';
import { ReturnCarController } from '@modules/rentals/usecases/returnCar/ReturnCarController';

import { ensureAuthenticated } from '../middlewares/ensureAthenticated';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const returnCarController = new ReturnCarController();
const listRentalByUserController = new ListRentalByUserController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalsRoutes.post(
    '/devolution:id',
    ensureAuthenticated,
    returnCarController.handle
);
rentalsRoutes.get(
    '/user',
    ensureAuthenticated,
    listRentalByUserController.handle
);

export { rentalsRoutes };
