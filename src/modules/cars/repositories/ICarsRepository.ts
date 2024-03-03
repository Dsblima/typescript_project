import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

export interface ICarsRepository {
    findByLicensePlate(license_plate: string): Promise<Car>;
    create(data: ICreateCarDTO): Promise<Car>;
    findAll(): Promise<Car[]>;
    findAvailable(
        category_id?: string,
        brand?: string,
        name?: string
    ): Promise<Car[]>;
    findById(car_id: string): Promise<Car>;
}
