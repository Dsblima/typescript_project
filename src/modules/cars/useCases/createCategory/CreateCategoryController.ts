import { Response, Request } from "express";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
    constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;

        await this.createCategoryUseCase.execute({ name, description });
        console.log("createCategoryUseCase");
        return response.status(201).send();
    }
}

export { CreateCategoryController };
