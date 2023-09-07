import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/entities/User";

import { IUserRepository } from "../interfaces/IUsersRepository";

class UsersRepositoryInMemory implements IUserRepository {
    users: User[] = [];

    async create({
        email,
        name,
        password,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            email,
            name,
            password,
            driver_license,
        });

        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find((user) => user.email === email);
    }

    async findById(id: string): Promise<User> {
        return this.users.find((user) => user.id === id);
    }
}

export { UsersRepositoryInMemory };
