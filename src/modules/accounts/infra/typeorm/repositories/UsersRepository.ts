import { Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUserRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository';
import { connectionSource } from '@shared/infra/typeorm';

export class UsersRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = connectionSource.getRepository(User);
    }

    async create({
        name,
        password,
        email,
        driver_license,
        avatar,
        id,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            password,
            email,
            driver_license,
            avatar,
            id,
        });

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ where: { email } });

        return user;
    }
    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({ where: { id } });

        return user;
    }
}
