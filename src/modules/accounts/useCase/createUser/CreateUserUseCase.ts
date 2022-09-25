import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../entities/dtos/ICreateUserDTO";
import { IUserRepository } from "../../entities/repositories/interfaces/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository
    ) {}

    async execute({
        name,
        username,
        password,
        email,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        await this.usersRepository.create({
            name,
            username,
            password,
            email,
            driver_license,
        });
    }
}

export { CreateUserUseCase };
