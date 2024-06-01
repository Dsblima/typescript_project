import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ReturnCarUseCase } from './ReturnCarUseCase';

export class ReturnCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const returnCarUseCase = container.resolve(ReturnCarUseCase);

        const { id: user_id } = request.user;
        const { id } = request.params;

        const rental = returnCarUseCase.execute({ id, user_id });

        return response.status(200).json(rental);
    }
}
