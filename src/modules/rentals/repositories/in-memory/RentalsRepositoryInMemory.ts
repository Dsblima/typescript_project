import { ICreateRentalDTO } from '@modules/rentals/dto/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

export class RentalsRepositoryInMemory implements IRentalsRepository {
    findById(id: string): Promise<Rental> {
        throw new Error('Method not implemented.');
    }
    rentals: Rental[] = [];

    async findOpenedRentalByCar(car_id: string): Promise<Rental> {
        return this.rentals.find(
            (rental) => rental.car_id === car_id && !rental.end_date
        );
    }

    async findOpenedRentalByUser(user_id: string): Promise<Rental> {
        return this.rentals.find(
            (rental) => rental.user_id === user_id && !rental.end_date
        );
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        return this.rentals.filter((rental) => rental.user_id === user_id);
    }
    async createRental({
        car_id,
        user_id,
        expected_return_date,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental();

        Object.assign(rental, {
            car_id,
            user_id,
            expected_return_date,
            start_date: new Date(),
        });

        this.rentals.push(rental);
        return rental;
    }
}