import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRespositoryInMemory';

import { ListCarsUseCase } from './ListCarsUseCase';

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    });

    it('should be able to list all available cars', async () => {
        const newCar = await carsRepositoryInMemory.create({
            name: 'Name car',
            description: ' description',
            daily_rate: 100,
            license_plate: ' XYZ-2367',
            fine_amount: 80,
            brand: 'Brand',
            category_id: 'categoryid',
        });

        const availableCars = await listCarsUseCase.execute({});

        expect(availableCars).toEqual([newCar]);
    });

    it('should be able to list all available cars by name', async () => {
        const newCar = await carsRepositoryInMemory.create({
            name: 'new car 2',
            description: ' description',
            daily_rate: 100,
            license_plate: ' XYZ-2367',
            fine_amount: 80,
            brand: 'Brand',
            category_id: 'categoryid',
        });

        const availableCars = await listCarsUseCase.execute({
            name: 'new car 2',
        });

        expect(availableCars).toEqual([newCar]);
    });

    it('should be able to list all available cars by brand', async () => {
        const newCar = await carsRepositoryInMemory.create({
            name: 'new car 2',
            description: ' description',
            daily_rate: 100,
            license_plate: ' XYZ-2367',
            fine_amount: 80,
            brand: 'Brand 12',
            category_id: 'categoryid',
        });

        const availableCars = await listCarsUseCase.execute({
            brand: 'Brand 12',
        });

        expect(availableCars).toEqual([newCar]);
    });

    it('should be able to list all available cars by category id', async () => {
        const newCar = await carsRepositoryInMemory.create({
            name: 'new car 2',
            description: ' description',
            daily_rate: 100,
            license_plate: ' XYZ-2367',
            fine_amount: 80,
            brand: 'Brand 12',
            category_id: 'categoryid',
        });

        const availableCars = await listCarsUseCase.execute({
            category_id: 'categoryid',
        });

        expect(availableCars).toEqual([newCar]);
    });
});
