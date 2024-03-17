import { RentalsRepositortyInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: RentalsRepositortyInMemory;

describe('Create a rental', () => {
    beforeEach(() => {
        rentalsRepository = new RentalsRepositortyInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepository);
    });

    it('should be able to create a new rental', async () => {
        const rental = await createRentalUseCase.execute({
            car_id: '12334',
            user_id: '5678',
            expected_return_date: new Date(),
        });

        console.log(rental);

        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    });

    it('should not able to create a new rental to a car already rented', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: '12334',
                user_id: '56782',
                expected_return_date: new Date(),
            });

            await createRentalUseCase.execute({
                car_id: '12334',
                user_id: '567821',
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
