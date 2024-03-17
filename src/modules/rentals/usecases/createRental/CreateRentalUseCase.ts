import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
    car_id: string;
    user_id: string;
    expected_return_date: Date;
}

export class CreateRentalUseCase {
    constructor(private rentalRepository: IRentalsRepository) {}

    async execute({
        car_id,
        user_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const isCarRented = await this.rentalRepository.findOpenedRentalByCar(
            car_id
        );

        if (isCarRented) {
            throw new AppError('This car is unavailable');
        }

        const isUserWithOpenedRented =
            await this.rentalRepository.findOpenedRentalByUser(user_id);

        if (isUserWithOpenedRented) {
            throw new AppError('This user already has a rental in his name');
        }

        const createdRental = this.rentalRepository.createRental({
            user_id,
            car_id,
            expected_return_date,
        });

        return createdRental;
    }
}
