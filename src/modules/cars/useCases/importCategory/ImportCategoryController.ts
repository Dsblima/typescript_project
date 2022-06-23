import { Request, Response } from "express";

import { ImportCategoryUseCase } from "./ImportCategotyUseCase";

class ImportCategoryController {
    constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

    handle(request: Request, reponse: Response): Response {
        const { file } = request;
        this.importCategoryUseCase.execute(file);
        return reponse.send();
    }
}

export { ImportCategoryController };
