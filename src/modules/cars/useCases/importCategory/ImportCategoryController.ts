import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoryUseCase } from "./ImportCategotyUseCase";

class ImportCategoryController {
    async handle(request: Request, reponse: Response): Promise<Response> {
        const { file } = request;
        const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
        await importCategoryUseCase.execute(file);
        return reponse.status(201).send();
    }
}

export { ImportCategoryController };
