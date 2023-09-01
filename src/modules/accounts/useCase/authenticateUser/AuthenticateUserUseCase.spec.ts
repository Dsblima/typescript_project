import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

function createUserToTest(): ICreateUserDTO {
    const user: ICreateUserDTO = {
        driver_license: "00124",
        email: "email@email.com",
        password: "123",
        name: "User Test",
    };
    return user;
}

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("should be able to create a new user", async () => {
        const user: ICreateUserDTO = createUserToTest();

        await createUserUseCase.execute(user);

        const createdUser = await usersRepositoryInMemory.findByEmail(
            user.email
        );

        expect(createdUser).toHaveProperty("id");
    });

    it("should be able to authenticate a user", async () => {
        const user: ICreateUserDTO = createUserToTest();

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("should not to be able to authenticate a nonexistent user", async () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "nonexistent@email.com",
                password: "nonexistentuser",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not to be able to authenticate with incorrect password", async () => {
        expect(async () => {
            const user: ICreateUserDTO = createUserToTest();

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "wrong password",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
