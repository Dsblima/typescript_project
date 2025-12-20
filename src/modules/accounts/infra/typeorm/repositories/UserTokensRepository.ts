import { Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { IUserTokensRepository } from '@modules/accounts/repositories/interfaces/IUserTokensRepository';
import { connectionSource } from '@shared/infra/typeorm';

import { UserTokens } from '../entities/UserTokens';

export class UserTokensRepository implements IUserTokensRepository {
    private repository: Repository<UserTokens>;

    constructor() {
        this.repository = connectionSource.getRepository(UserTokens);
    }
    async create({
        user_id,
        refresh_token,
        expires_date,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id,
        });

        await this.repository.save(userToken);

        return userToken;
    }
}
