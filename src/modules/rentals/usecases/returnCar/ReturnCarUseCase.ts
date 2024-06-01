import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
export class ReturnCarUseCase {
    constructor(
        @inject('RentalsRepository')
        private rentalRepository: IRentalsRepository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider,
        @inject('CarsRepository')
        private carsRepository: ICarsRepository
    ) {}

    async execute({ id, user_id }: IRequest): Promise<Rental> {
        const rental = await this.rentalRepository.findById(id);
        const car = await this.carsRepository.findById(rental.car_id);
        let total: number;
        const MINIMUM_RENTAL_DURATION = 1;

        if (!rental) throw new AppError('rental not found!');
        if (!car) throw new AppError('car not found!');

        const dateNow = this.dateProvider.dateNow();

        let dailyCount = this.dateProvider.compareInDays(
            rental.start_date,
            dateNow
        );

        if (dailyCount <= 0) dailyCount = MINIMUM_RENTAL_DURATION;

        const delayCount = this.dateProvider.compareInDays(
            rental.end_date,
            dateNow
        );

        total = delayCount * car.fine_amount;
        total += dailyCount * car.daily_rate;

        rental.end_date = dateNow;
        rental.total = total;

        await this.rentalRepository.createRental(rental);
        await this.carsRepository.updateAvailable(car.id, true);

        return rental;
    }
}
