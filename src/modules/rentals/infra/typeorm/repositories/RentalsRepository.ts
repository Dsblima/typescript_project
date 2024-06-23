import { Repository, getRepository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dto/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

import { Rental } from '../entities/Rental';

export class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async findOpenedRentalByCar(car_id: string): Promise<Rental> {
        const rental = await this.repository.findOne({
            where: { car_id, end_date: null },
        });

        return rental;
    }

    async findOpenedRentalByUser(user_id: string): Promise<Rental> {
        const rental = await this.repository.findOne({
            where: { user_id, end_date: null },
        });

        return rental;
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        const rentals = await this.repository.find({
            where: { user_id },
            relations: ['car'],
        });
        return rentals;
    }

    async createRental({
        car_id,
        user_id,
        expected_return_date,
        id,
        end_date,
        total,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            user_id,
            expected_return_date,
            id,
            end_date,
            total,
        });

        await this.repository.save(rental);

        return rental;
    }

    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOne({ where: { id } });
        return rental;
    }
}