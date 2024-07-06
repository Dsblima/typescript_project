import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRespositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create a rental', () => {
    const tomorrow = dayjs().add(1, 'day').toDate();

    beforeEach(() => {
        rentalsRepository = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepository,
            dayjsDateProvider,
            carsRepositoryInMemory
        );
    });

    it('should be able to create a new rental', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Test car',
            description: 'Test car description',
            daily_rate: 100,
            license_plate: 'ABC-12',
            fine_amount: 40,
            category_id: '1234',
            brand: 'Test',
        });

        const rental = await createRentalUseCase.execute({
            car_id: car.id,
            user_id: '5678',
            expected_return_date: tomorrow,
        });

        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    });

    it('should not able to create a new rental to a user with other a rental opened', async () => {
        await rentalsRepository.createRental({
            car_id: '1233',
            user_id: '567821',
            expected_return_date: tomorrow,
        });
        await expect(
            createRentalUseCase.execute({
                car_id: '123345',
                user_id: '567821',
                expected_return_date: tomorrow,
            })
        ).rejects.toEqual(
            new AppError('This user already has a rental in his name')
        );
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
