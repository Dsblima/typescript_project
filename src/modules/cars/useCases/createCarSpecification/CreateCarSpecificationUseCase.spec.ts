import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRespositoryInMemory';
import { SpecificationRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: ICarsRepository;
let specificationRepositoryInMemory: ISpecificationsRepository;

describe('Create a specification', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationRepositoryInMemory
        );
    });

    it('should not to be able to add a new specification to non existent car ', async () => {
        expect(async () => {
            const car_id = '1234';
            const specifications_id = ['2345'];
            await createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to add a new specification to the car ', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Name car',
            description: ' description',
            daily_rate: 100,
            license_plate: ' XYZ-2367',
            fine_amount: 80,
            brand: 'Brand',
            category_id: 'categoryid',
        });

        const specification = await specificationRepositoryInMemory.create({
            description: 'specification desc',
            name: 'spec name',
        });
        const car_id = car.id;
        const specifications_id = [specification.id];
        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id,
            specifications_id,
        });

        console.log(specificationsCars);
        expect(specificationsCars).toHaveProperty('specifications');
        expect(specificationsCars.specifications.length).toBe(1);
    });
});
