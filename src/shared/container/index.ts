import { container } from "tsyringe";

import { UsersRepository } from "../../modules/accounts/entities/repositories/implementations/UsersRepository";
import { IUserRepository } from "../../modules/accounts/entities/repositories/interfaces/IUsersRepository";
import { ICategoryRepository } from "../../modules/cars/repositories/ICategoryRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";

container.registerSingleton<ICategoryRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
);

container.registerSingleton<IUserRepository>(
    "UsersRespository",
    UsersRepository
);
