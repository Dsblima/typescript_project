import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImageUseCase } from './UploadCarImageUseCase';

interface IFiles {
    filename: string;
}

export class UploadCarImageController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const images = request.files as IFiles[];

        const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

        const images_names = images.map((file) => file.filename);

        await uploadCarImageUseCase.execute({ car_id: id, images_names });
        return response.status(201).send();
    }
}