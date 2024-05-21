import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

export class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];
    async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            id,
        });

        this.cars.push(car);
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);
    }

    findAll(): Promise<Car[]> {
        throw new Error('Method not implemented.');
    }

    async findAvailable(
        category_id?: string,
        brand?: string,
        name?: string
    ): Promise<Car[]> {
        const availableCars = this.cars.filter((car) => {
            if (
                car.available === true ||
                (brand && car.brand === brand) ||
                (name && car.name === name) ||
                (category_id && car.category_id === category_id)
            ) {
                return car;
            }
            return null;
        });

        return availableCars;
    }

    async findById(car_id: string): Promise<Car> {
        return this.cars.find((car) => car.id === car_id);
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        const foundIndex = this.cars.findIndex((car) => car.id === id);
        this.cars[foundIndex].available = available;
    }
}
