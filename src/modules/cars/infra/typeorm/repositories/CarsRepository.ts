import { Repository, getRepository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

export class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne({
            where: { id },
        });
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ where: { license_plate } });
        return car;
    }

    async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name,
        specifications,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            specifications,
            id,
        });

        await this.repository.save(car);

        return car;
    }

    findAll(): Promise<Car[]> {
        throw new Error('Method not implemented.');
    }

    async findAvailable(
        category_id?: string,
        brand?: string,
        name?: string
    ): Promise<Car[]> {
        const carsQuery = await this.repository
            .createQueryBuilder('cars')
            .where('available = :available', { available: true });

        if (brand) {
            carsQuery.andWhere('cars.brand = :brand', { brand });
        }

        if (category_id) {
            carsQuery.andWhere('cars.category_id = :category_id', {
                category_id,
            });
        }

        if (name) {
            carsQuery.andWhere('cars.name = :name', { name });
        }

        const cars = await carsQuery.getMany();

        return cars;
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ available })
            .where('id = :id')
            .setParameters({ id })
            .execute();
    }
}
