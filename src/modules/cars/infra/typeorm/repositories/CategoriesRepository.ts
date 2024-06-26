/* eslint-disable no-use-before-define */
import { Repository } from 'typeorm';

import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import {
    ICategoryRepository,
    ICreateCategoryDTO,
} from '@modules/cars/repositories/ICategoryRepository';
import { connectionSource } from '@shared/infra/typeorm';

export class CategoriesRepository implements ICategoryRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = connectionSource.getRepository(Category);
    }

    async create({ description, name }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({ description, name });

        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ where: { name } });
        return category;
    }
}
