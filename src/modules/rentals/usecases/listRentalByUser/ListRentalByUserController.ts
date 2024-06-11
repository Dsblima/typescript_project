import { Request, Response, response } from 'express';
import { container } from 'tsyringe';

import { ListRentalByUserUseCase } from './ListRentalByUserUseCase';

export class ListRentalByUserController {
    async handle(request: Request, reponse: Response): Promise<Response> {
        const { id } = request.user;

        const listRentalByUserUseCase = container.resolve(
            ListRentalByUserUseCase
        );

        const rentals = await listRentalByUserUseCase.execute({ user_id: id });

        return response.json(rentals);
    }
}
