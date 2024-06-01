import { ICreateRentalDTO } from '../dto/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

export interface IRentalsRepository {
    findOpenedRentalByCar(car_id: string): Promise<Rental>;
    findOpenedRentalByUser(user_id: string): Promise<Rental>;
    createRental(data: ICreateRentalDTO): Promise<Rental>;
    findById(id: string): Promise<Rental>;
}
