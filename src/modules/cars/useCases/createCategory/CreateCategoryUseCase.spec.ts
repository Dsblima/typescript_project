import { AppError } from "@errors/AppError";
import { CategoryRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoryRepositoryInMemory";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoryRepositoryInMemory;

describe("Create Category", () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoryRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemory
        );
    });

    it("Should be able to create a new category", async () => {
        const category = {
            name: "Category test",
            description: "This is a new category",
        };

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        const createdCategory = await categoriesRepositoryInMemory.findByName(
            category.name
        );

        console.log(categoriesRepositoryInMemory);
        console.log(createdCategory);

        expect(createdCategory).toHaveProperty("id");
    });

    it("should not to be able a new category with a name that already exists", async () => {
        expect(async () => {
            const category = {
                name: "Category test",
                description: "This is a new category",
            };

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should be able to...", () => {
        const soma = 2 + 2;
        const resultado = 4;

        expect(soma).toBe(resultado);
    });

    it("Should not be...", () => {
        const soma = 2 + 2;
        const resultado = 5;

        expect(soma).not.toBe(resultado);
    });
});
