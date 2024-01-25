import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRespositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it('should be able to create a new car', async () => {
        const car = await createCarUseCase.execute({
            name: 'Name car',
            description: ' description',
            daily_rate: 100,
            license_plate: ' XYZ-2367',
            fine_amount: 80,
            brand: 'Brand',
            category_id: 'categoryid',
        });

        expect(car).toHaveProperty('id');
    });

    it('Should be able to create a car with available true by default', async () => {
        const car = await createCarUseCase.execute({
            name: 'Name car 1',
            description: 'description',
            daily_rate: 100,
            license_plate: ' XYZ-2367',
            fine_amount: 80,
            brand: 'Brand',
            category_id: 'categoryid',
        });

        expect(car.available).toBe(true);
    });
    it('Should not be able to create a car with an existing license plate', () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: 'Name car 1',
                description: 'description',
                daily_rate: 100,
                license_plate: ' XYZ-2367',
                fine_amount: 80,
                brand: 'Brand',
                category_id: 'categoryid',
            });

            await createCarUseCase.execute({
                name: 'Name car 2',
                description: 'description',
                daily_rate: 100,
                license_plate: ' XYZ-2367',
                fine_amount: 80,
                brand: 'Brand',
                category_id: 'categoryid',
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
