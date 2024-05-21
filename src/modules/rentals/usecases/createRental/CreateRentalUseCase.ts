import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
    car_id: string;
    user_id: string;
    expected_return_date: Date;
}

@injectable()
export class CreateRentalUseCase {
    constructor(
        @inject('RentalsRepository')
        private rentalRepository: IRentalsRepository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider,
        @inject('CarsRepository')
        private carsRepository: ICarsRepository
    ) {}

    async execute({
        car_id,
        user_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const MINIMUM_RENTAL_DURATION = 24;

        const isCarRented = await this.rentalRepository.findOpenedRentalByCar(
            car_id
        );

        if (isCarRented) {
            throw new AppError('This car is unavailable');
        }

        const isUserWithOpenedRental =
            await this.rentalRepository.findOpenedRentalByUser(user_id);

        if (isUserWithOpenedRental) {
            throw new AppError('This user already has a rental in his name');
        }

        const compare = this.dateProvider.compareInHours(
            this.dateProvider.dateNow(),
            expected_return_date
        );

        if (compare < MINIMUM_RENTAL_DURATION) {
            throw new AppError('Invalid return date!');
        }

        const createdRental = this.rentalRepository.createRental({
            user_id,
            car_id,
            expected_return_date,
        });

        this.carsRepository.updateAvailable(car_id, false);

        return createdRental;
    }
}
