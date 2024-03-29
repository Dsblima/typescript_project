import dayjs from 'dayjs';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create a rental', () => {
    const tomorrow = dayjs().add(1, 'day').toDate();

    beforeEach(() => {
        rentalsRepository = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepository,
            dayjsDateProvider
        );
    });

    it('should be able to create a new rental', async () => {
        const rental = await createRentalUseCase.execute({
            car_id: '12334',
            user_id: '5678',
            expected_return_date: tomorrow,
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
                expected_return_date: tomorrow,
            });

            await createRentalUseCase.execute({
                car_id: '12334',
                user_id: '567821',
                expected_return_date: tomorrow,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should not able to create a new rental with a period smaller than 24 hours.', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: '12334',
                user_id: '56782',
                expected_return_date: dayjsDateProvider.dateNow(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
