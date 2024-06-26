/* eslint-disable no-use-before-define */
import { Repository } from 'typeorm';

import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from '@modules/cars/repositories/ISpecificationsRepository';
import { connectionSource } from '@shared/infra/typeorm';

export class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = connectionSource.getRepository(Specification);
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findByIds(ids);
        return specifications;
    }

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({ description, name });

        await this.repository.save(specification);

        return specification;
    }

    async list(): Promise<Specification[]> {
        const specifications = await this.repository.find();
        return specifications;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({
            where: { name },
        });
        return specification;
    }
}
